import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../lib/contacto.js";

const baseEnv = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_TO: "belen@example.com",
  CONTACT_FROM: "Web Bele Cortese <web@example.com>",
};

const validClinicBody = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+54 341 555 5555",
  area: "clinica",
  privacy: "on",
  website: "",
  clinica_edad: "7 a 12",
  clinica_zona: "Roldán",
  clinica_motivo: "Consulta general por integración sensorial.",
};

function makeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function makeReq({ method = "POST", body = {}, headers = {} } = {}) {
  return {
    method,
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
}

function makeFetch({ ok = true, status = 200 } = {}) {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return {
      ok,
      status,
      async json() {
        return ok ? { id: "email_1" } : { message: "provider error" };
      },
    };
  };
  return { calls, fetchImpl };
}

async function invoke(handler, request) {
  const res = makeRes();
  await handler(request, res);
  return res;
}

test("rejects methods other than POST", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ method: "GET" }));
  assert.equal(res.statusCode, 405);
  assert.equal(res.body.ok, false);
});

test("returns 422 when common required fields are missing", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ body: { area: "clinica" } }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.ok, false);
});

test("returns 415 for non-JSON content types", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({
    body: validClinicBody,
    headers: { "content-type": "text/plain" },
  }));
  assert.equal(res.statusCode, 415);
  assert.equal(res.body.error, "unsupported_media_type");
});

test("returns 422 when consent is missing", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const body = { ...validClinicBody, privacy: "" };
  const res = await invoke(handler, makeReq({ body }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.error, "missing_consent");
});

test("returns 422 for an invalid email", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ body: { ...validClinicBody, email: "no-es-email" } }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.error, "invalid_email");
});

test("rejects an email with CRLF injection", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({
    body: { ...validClinicBody, email: "ana@example.com\r\nBcc: evil@example.com" },
  }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.error, "invalid_email");
});

test("returns 422 when an area-specific required field is missing", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const body = { ...validClinicBody };
  delete body.clinica_zona;
  const res = await invoke(handler, makeReq({ body }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.error, "missing_area_fields");
});

test("rejects an unknown area", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ body: { ...validClinicBody, area: "otra" } }));
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.error, "invalid_area");
});

test("silently accepts a honeypot submission without sending email", async () => {
  const { calls, fetchImpl } = makeFetch();
  const handler = createContactHandler({ env: baseEnv, fetchImpl });
  const res = await invoke(handler, makeReq({ body: { ...validClinicBody, website: "https://spam.example" } }));
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.ok, true);
  assert.equal(calls.length, 0);
});

test("sends one email with reply-to and the area details", async () => {
  const { calls, fetchImpl } = makeFetch();
  const handler = createContactHandler({ env: baseEnv, fetchImpl });
  const res = await invoke(handler, makeReq({ body: validClinicBody }));

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.ok, true);
  assert.equal(calls.length, 1);

  const [{ url, options }] = calls;
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(options.method, "POST");
  assert.equal(options.headers.Authorization, "Bearer re_test_key");

  const payload = JSON.parse(options.body);
  assert.deepEqual(payload.to, ["belen@example.com"]);
  assert.equal(payload.from, baseEnv.CONTACT_FROM);
  assert.equal(payload.reply_to, "ana@example.com");
  assert.match(payload.subject, /Clínica/);
  assert.match(payload.subject, /Ana Pérez/);
  assert.match(payload.text, /Motivo/);
  assert.match(payload.text, /Roldán/);
  assert.doesNotMatch(payload.text, /website/i);
  assert.equal(res.headers["cache-control"], "no-store");
});

test("sanitizes CRLF from the email subject", async () => {
  const { calls, fetchImpl } = makeFetch();
  const handler = createContactHandler({ env: baseEnv, fetchImpl });
  const body = { ...validClinicBody, name: "Ana\r\nBcc: evil@example.com" };
  const res = await invoke(handler, makeReq({ body }));
  assert.equal(res.statusCode, 200);
  const payload = JSON.parse(calls[0].options.body);
  assert.doesNotMatch(payload.subject, /[\r\n]/);
  assert.match(payload.subject, /Ana Bcc: evil@example.com/);
});

test("returns 502 when the provider rejects the email", async () => {
  const { fetchImpl } = makeFetch({ ok: false, status: 500 });
  const handler = createContactHandler({ env: baseEnv, fetchImpl });
  const res = await invoke(handler, makeReq({ body: validClinicBody }));
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.ok, false);
});

test("returns 503 when required environment variables are missing", async () => {
  const handler = createContactHandler({
    env: { ...baseEnv, RESEND_API_KEY: "" },
    fetchImpl: makeFetch().fetchImpl,
  });
  const res = await invoke(handler, makeReq({ body: validClinicBody }));
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.error, "not_configured");
});

test("returns 400 for malformed JSON", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ body: "{not-json" }));
  assert.equal(res.statusCode, 400);
});

test("returns 413 for oversized payloads", async () => {
  const handler = createContactHandler({ env: baseEnv, fetchImpl: makeFetch().fetchImpl });
  const res = await invoke(handler, makeReq({ body: JSON.stringify({ name: "x".repeat(25000) }) }));
  assert.equal(res.statusCode, 413);
});

test("rate limits after five requests from the same IP", async () => {
  const { fetchImpl } = makeFetch();
  const handler = createContactHandler({
    env: baseEnv,
    fetchImpl,
    now: () => 1_700_000_000_000,
  });

  for (let i = 0; i < 5; i += 1) {
    const res = await invoke(handler, makeReq({ body: validClinicBody }));
    assert.equal(res.statusCode, 200, `request ${i + 1} should be accepted`);
  }

  const blocked = await invoke(handler, makeReq({ body: validClinicBody }));
  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.body.error, "rate_limited");
  assert.equal(blocked.headers["retry-after"], "600");
});

import { createContactHandler } from "../../../lib/contacto.js";

export const runtime = "nodejs";

const handler = createContactHandler();

type ResponseState = {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
};

function createResponseAdapter() {
  const state: ResponseState = {
    statusCode: 200,
    headers: {},
    body: undefined,
  };

  return {
    state,
    status(code: number) {
      state.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string) {
      state.headers[name.toLowerCase()] = value;
      return this;
    },
    json(body: unknown) {
      state.body = body;
      return this;
    },
  };
}

export async function POST(request: Request) {
  const body = await request.text();
  const req = {
    method: "POST",
    headers: Object.fromEntries(request.headers.entries()),
    body,
  };
  const res = createResponseAdapter();

  await handler(req, res);

  return new Response(JSON.stringify(res.state.body ?? { ok: false, error: "invalid_response" }), {
    status: res.state.statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...res.state.headers,
    },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
    status: 405,
    headers: {
      "content-type": "application/json; charset=utf-8",
      allow: "POST",
    },
  });
}

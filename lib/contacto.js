const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const AREA_LABELS = {
  clinica: "Clínica",
  accesibilidad: "Accesibilidad e inclusión",
  formacion: "Formación y experiencias",
  welove: "We Love TO",
  general: "Trayectoria o consulta general",
};

const AREA_REQUIRED_FIELDS = {
  clinica: ["clinica_edad", "clinica_zona", "clinica_motivo"],
  accesibilidad: ["access_org", "access_mensaje"],
  formacion: ["formacion_institucion", "formacion_mensaje"],
  welove: ["welove_pais", "welove_mensaje"],
  general: ["general_mensaje"],
};

const FIELD_LABELS = {
  name: "Nombre y apellido",
  email: "Email",
  phone: "Teléfono o WhatsApp",
  clinica_edad: "Edad o rango",
  clinica_zona: "Zona",
  clinica_motivo: "Motivo general",
  access_org: "Organización",
  access_tipo: "Tipo de organización",
  access_rol: "Rol de quien escribe",
  access_servicio: "Servicio de interés",
  access_mensaje: "Mensaje",
  formacion_institucion: "Institución o grupo",
  formacion_publico: "Público",
  formacion_formato: "Formato",
  formacion_fechas: "Fechas tentativas",
  formacion_mensaje: "Mensaje",
  welove_pais: "País",
  welove_rol: "Rol",
  welove_interes: "Interés",
  welove_mensaje: "Mensaje",
  general_motivo: "Motivo",
  general_mensaje: "Mensaje",
};

const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  area: 40,
  clinica_edad: 40,
  clinica_zona: 80,
  clinica_motivo: 5_000,
  access_org: 160,
  access_tipo: 80,
  access_rol: 120,
  access_servicio: 120,
  access_mensaje: 5_000,
  formacion_institucion: 160,
  formacion_publico: 80,
  formacion_formato: 80,
  formacion_fechas: 120,
  formacion_mensaje: 5_000,
  welove_pais: 80,
  welove_rol: 80,
  welove_interes: 120,
  welove_mensaje: 5_000,
  general_motivo: 80,
  general_mensaje: 5_000,
};

const AREA_FIELDS = Object.values(AREA_REQUIRED_FIELDS).flat();

class BodyError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

function text(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function cleanHeader(value) {
  return text(value).replace(/[\r\n]+/g, " ").slice(0, 240);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"] || req.headers?.["X-Forwarded-For"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  const real = req.headers?.["x-real-ip"] || req.headers?.["X-Real-IP"];
  return typeof real === "string" && real.trim() ? real.trim() : "unknown";
}

async function readBody(req) {
  const raw = req.body;

  if (raw && typeof raw === "object" && !Buffer.isBuffer(raw) && !Array.isArray(raw)) {
    if (Buffer.byteLength(JSON.stringify(raw)) > MAX_BODY_BYTES) throw new BodyError("payload_too_large");
    return raw;
  }

  const body = Buffer.isBuffer(raw) ? raw.toString("utf8") : raw;
  if (typeof body !== "string" || !body.trim()) return {};

  if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) throw new BodyError("payload_too_large");

  try {
    const parsed = JSON.parse(body);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    throw new BodyError("invalid_json");
  }
}

function normalize(body) {
  const data = {
    name: text(body.name),
    email: text(body.email),
    phone: text(body.phone),
    area: text(body.area).toLowerCase(),
    privacy: body.privacy === true || body.privacy === "on" || body.privacy === "true",
  };

  for (const field of AREA_FIELDS) data[field] = text(body[field]);

  return data;
}

function validate(data) {
  if (!data.name || !data.email || !data.area) return "missing_fields";
  if (!data.privacy) return "missing_consent";
  if (!isEmail(data.email)) return "invalid_email";
  if (!Object.hasOwn(AREA_LABELS, data.area)) return "invalid_area";

  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (data[field] && data[field].length > limit) return "invalid_field";
  }

  const required = AREA_REQUIRED_FIELDS[data.area];
  if (required.some((field) => !data[field])) return "missing_area_fields";

  return null;
}

function buildText(data) {
  const lines = [
    "Nueva consulta desde la web de Bele Cortese.",
    "",
    `Área: ${AREA_LABELS[data.area]}`,
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
  ];

  if (data.phone) lines.push(`Teléfono o WhatsApp: ${data.phone}`);
  lines.push("Consentimiento de privacidad: sí");

  for (const field of ["clinica_edad", "clinica_zona", "clinica_motivo", "access_org", "access_tipo", "access_rol", "access_servicio", "access_mensaje", "formacion_institucion", "formacion_publico", "formacion_formato", "formacion_fechas", "formacion_mensaje", "welove_pais", "welove_rol", "welove_interes", "welove_mensaje", "general_motivo", "general_mensaje"]) {
    if (data[field]) lines.push(`${FIELD_LABELS[field]}: ${data[field]}`);
  }

  lines.push("", "Enviado desde el formulario de contacto.");
  return lines.join("\n");
}

function getRecipients(env) {
  return text(env.CONTACT_TO)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function buildEmail(data, env, recipients) {
  return {
    from: cleanHeader(env.CONTACT_FROM),
    to: recipients,
    reply_to: data.email,
    subject: cleanHeader(`[Web] ${AREA_LABELS[data.area]} — ${data.name}`),
    text: buildText(data),
  };
}

function allowRequest(ip, hits, now) {
  const cutoff = now - WINDOW_MS;

  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((timestamp) => timestamp > cutoff);
    if (recent.length) hits.set(key, recent);
    else hits.delete(key);
  }

  const recent = (hits.get(ip) || []).filter((timestamp) => timestamp > cutoff);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return false;

  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function createContactHandler({ fetchImpl = globalThis.fetch, env = process.env, now = () => Date.now() } = {}) {
  const hits = new Map();

  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "method_not_allowed" });
    }

    const contentType = String(req.headers?.["content-type"] || "").toLowerCase();
    if (!contentType.startsWith("application/json")) {
      return res.status(415).json({ ok: false, error: "unsupported_media_type" });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
      return res.status(503).json({ ok: false, error: "not_configured" });
    }

    const recipients = getRecipients(env);
    if (!recipients.length) return res.status(503).json({ ok: false, error: "not_configured" });

    if (!allowRequest(getIp(req), hits, now())) {
      res.setHeader("Retry-After", String(Math.ceil(WINDOW_MS / 1000)));
      return res.status(429).json({ ok: false, error: "rate_limited" });
    }

    let body;
    try {
      body = await readBody(req);
    } catch (error) {
      if (error instanceof BodyError && error.code === "payload_too_large") {
        return res.status(413).json({ ok: false, error: "payload_too_large" });
      }
      return res.status(400).json({ ok: false, error: "invalid_json" });
    }

    // A filled honeypot is treated as a successful no-op, so bots do not learn it was rejected.
    if (text(body.website)) return res.status(200).json({ ok: true });

    const data = normalize(body);
    const validationError = validate(data);
    if (validationError) return res.status(422).json({ ok: false, error: validationError });

    let response;
    try {
      response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildEmail(data, env, recipients)),
      });
    } catch {
      return res.status(502).json({ ok: false, error: "provider_error" });
    }

    if (!response.ok) return res.status(502).json({ ok: false, error: "provider_error" });

    return res.status(200).json({ ok: true });
  };
}

export default createContactHandler();

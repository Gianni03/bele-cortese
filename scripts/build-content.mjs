import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const planning = path.join(root, "planning");

const pages = {
  home: "home-alta-fidelidad.html",
  clinica: "clinica-alta-fidelidad.html",
  accesibilidad: "accesibilidad-alta-fidelidad.html",
  formacion: "formacion-alta-fidelidad.html",
  welove: "we-love-to-alta-fidelidad.html",
  trayectoria: "trayectoria-alta-fidelidad.html",
  contacto: "contacto-alta-fidelidad.html",
  "accesibilidad-sitio": "accesibilidad-sitio-alta-fidelidad.html",
  privacidad: "privacidad-alta-fidelidad.html",
};

const replacements = [
  ["home-alta-fidelidad.html", "/"],
  ["clinica-alta-fidelidad.html", "/clinica"],
  ["accesibilidad-alta-fidelidad.html", "/accesibilidad-inclusion"],
  ["formacion-alta-fidelidad.html", "/formacion"],
  ["we-love-to-alta-fidelidad.html", "/we-love-to"],
  ["trayectoria-alta-fidelidad.html", "/trayectoria"],
  ["contacto-alta-fidelidad.html", "/contacto"],
  ["accesibilidad-sitio-alta-fidelidad.html", "/accesibilidad-del-sitio"],
  ["privacidad-alta-fidelidad.html", "/privacidad"],
  ["../Diseños/", "/Diseños/"],
];

function replaceLinks(value) {
  let result = value;
  for (const [from, to] of replacements) result = result.split(from).join(to);
  return result;
}

function extract(html) {
  const style = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join("\n");

  const scripts = [];
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = match[1] || "";
    const code = match[2] || "";
    if (/\bsrc\s*=/.test(attrs) || /application\/ld\+json/i.test(attrs)) continue;
    if (code.trim()) scripts.push(code);
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error("Body not found");

  let body = bodyMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<link[^>]+>/gi, "");

  body = replaceLinks(body);
  return {
    style: replaceLinks(style),
    body,
    scripts: scripts.map(replaceLinks),
  };
}

const output = {};
for (const [slug, filename] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(planning, filename), "utf8");
  output[slug] = extract(html);
}

const target = path.join(root, "content", "pages.js");
const source = `// Generated from planning/*-alta-fidelidad.html by scripts/build-content.mjs.\n// Re-run npm run build:content after editing a planning page.\nexport const pages = ${JSON.stringify(output, null, 2)};\n`;
fs.writeFileSync(target, source);
console.log(`Wrote ${target} with ${Object.keys(output).length} pages`);

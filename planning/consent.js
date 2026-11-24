(() => {
  const STORAGE_KEY = "bele-analytics-consent-v1";
  const GA_ID = "G-XMX3CXFTTK";
  const script = document.currentScript;
  const privacyUrl = script?.dataset.privacyUrl || "privacidad-alta-fidelidad.html#cookies";
  const analyticsScript = "https://www.googletagmanager.com/gtag/js";
  const localHosts = new Set(["localhost", "127.0.0.1", "[::1]", ""]);

  function loadStyles() {
    if (document.querySelector('link[data-consent-styles="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = script ? new URL("consent.css", script.src).href : "consent.css";
    link.dataset.consentStyles = "true";
    document.head.append(link);
  }

  function readChoice() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed.analytics === "boolean" ? parsed : null;
    } catch {
      return null;
    }
  }

  function saveChoice(analytics) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics,
        version: 1,
        updatedAt: new Date().toISOString(),
      }));
    } catch {
      // Storage can be unavailable or blocked. The choice still applies to this page view.
    }
  }

  function loadAnalytics() {
    if (window.__beleAnalyticsLoaded) return;
    window.__beleAnalyticsLoaded = true;

    if (!/^G-[A-Z0-9]+$/i.test(GA_ID)) {
      window.__beleAnalyticsSkipped = true;
      return;
    }

    // Avoid loading the production tag on local files or local development servers.
    if (location.protocol === "file:" || localHosts.has(location.hostname)) {
      window.__beleAnalyticsSkipped = true;
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());

    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `${analyticsScript}?id=${encodeURIComponent(GA_ID)}`;
    document.head.append(tag);

    window.gtag("config", GA_ID, {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  function hideBanner() {
    document.querySelector(".consent-banner")?.remove();
  }

  function showBanner(force = false) {
    if (!force && readChoice()) return;
    if (document.querySelector(".consent-banner")) return;

    const banner = document.createElement("aside");
    banner.className = "consent-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Preferencias de analítica");

    const copy = document.createElement("div");
    const eyebrow = document.createElement("p");
    eyebrow.className = "consent-eyebrow";
    eyebrow.textContent = "Analítica opcional";
    const title = document.createElement("h2");
    title.textContent = "Elegí si querés compartir datos de uso.";
    const description = document.createElement("p");
    description.textContent = "Si aceptás, cargamos Google Analytics 4 para entender qué páginas se usan. No se activa antes de tu elección, no usamos publicidad y podés cambiarla cuando quieras.";
    copy.append(eyebrow, title, description);

    const actions = document.createElement("div");
    actions.className = "consent-actions";

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "consent-button";
    accept.textContent = "Aceptar analítica";
    accept.addEventListener("click", () => {
      saveChoice(true);
      loadAnalytics();
      hideBanner();
    });

    const reject = document.createElement("button");
    reject.type = "button";
    reject.className = "consent-button consent-button--reject";
    reject.textContent = "Rechazar";
    reject.addEventListener("click", () => {
      saveChoice(false);
      hideBanner();
    });

    const privacy = document.createElement("a");
    privacy.className = "consent-privacy";
    privacy.href = privacyUrl;
    privacy.textContent = "Leer la política de privacidad";

    actions.append(accept, reject, privacy);
    banner.append(copy, actions);
    document.body.append(banner);
  }

  function initialise() {
    loadStyles();
    const choice = readChoice();

    if (choice?.analytics) {
      loadAnalytics();
    } else if (!choice) {
      showBanner();
    }

    document.addEventListener("click", (event) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-consent-open]") : null;
      if (!trigger) return;
      event.preventDefault();
      showBanner(true);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();

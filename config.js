// Environment-specific IDs
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const GA_ID = isLocalhost ? "G-FAKEID" : "G-TWOJE-ID";
const CLARITY_ID = isLocalhost ? "fakeid" : "twoje-id";

// Klaro Config for Google Analytics 4 with Polish language
var klaroConfig = {
  // Basic settings
  storageMethod: "cookie",
  storageName: "klaro-consent",
  version: 2,
  cookieExpiresAfterDays: 365,
  privacyPolicy: "/polityka-prywatnosci/",
  default: false,
  mustConsent: true,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  // Styling with theme
  styling: {
    theme: ["dark"],
  },
  // Set Polish as default language
  lang: "pl",

  // Google Analytics 4 configuration
  services: [
    {
      name: "googleAnalytics",
      title: "Google Analytics",
      purposes: ["analytics"],
      cookies: [/^_ga/, /^_gid/, /^_gat/, /^_gtag/],
      required: false,
      default: false,
      optOut: false,
      onlyOnce: true,
      onInit: 'console.log("Google Analytics service has been initialized.");',
      onDecline: `
        console.log("Google Analytics service has been declined by the user.");
        var gtagScript = document.createElement("script");
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
        document.head.appendChild(gtagScript);
        window.dataLayer = window.dataLayer || []; 
        function gtag() {
          dataLayer.push(arguments);
        }
        // Najpierw ustawiamy domyślne zgody
        gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        });
        // Następnie inicjalizujemy GA4
        gtag("js", new Date());
        gtag("config", "${GA_ID}");`,
      onAccept: `
        console.log("Google Analytics service has been accepted by the user.");
        var gtagScript = document.createElement("script");
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
        document.head.appendChild(gtagScript);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        // Najpierw ustawiamy domyślne zgody
        gtag("consent", "default", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "granted",
        });
        // Następnie inicjalizujemy GA4
        gtag("js", new Date());
        gtag("config", "${GA_ID}");`,
    },
    {
      name: "microsoftClarity",
      title: "Microsoft Clarity",
      purposes: ["analytics"],
      cookies: [/^_clsk/, /^_clck/, /^MUID/, /^MUIDB/, /^MR/, /^SM/],
      required: false,
      default: false,
      optOut: false,
      onlyOnce: true,
      onInit:
        '//console.log("Microsoft Clarity service has been initialized.");',
      onDecline: `
        //console.log("Microsoft Clarity service has been declined by the user.");
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
        window.clarity("consent", false);
        //console.log("Clarity consent revoked");`,
      onAccept: `
        //console.log("Microsoft Clarity service has been accepted by the user.");
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
        window.clarity("consent");
        //console.log("Clarity consent granted");`,
    },
    {
      name: "cloudflareAnalytics",
      title: "Cloudflare Analytics",
      purposes: ["analytics"],
      cookies: [/^cfz_zaraz-analytics/],
      required: false,
      default: false,
      optOut: false,
      onlyOnce: true,
    },
  ],

  // Polish translations
  translations: {
    pl: {
      consentModal: {
        title: "Informacja o plikach cookie",
        description:
          "Tutaj możesz zobaczyć i dostosować, jakie informacje są zbierane na tej stronie. Niektóre elementy mają wpływ na funkcjonowanie serwisu, więc ich wyłączenie może wpłynąć na Twoje doświadczenia z korzystania z witryny.",
      },
      consentNotice: {
        description:
          "Cześć! Chciałbym uzyskać Twoją zgodę na gromadzenie danych w celach analitycznych. Możesz zawsze zmienić lub wycofać swoją zgodę później.",
        learnMore: "Dowiedz się więcej",
        acceptAll: "Akceptuję wszystko",
        acceptSelected: "Akceptuję wybrane",
        decline: "Odrzucam",
      },
      purposes: {
        analytics: "Analityka",
        functional: "Funkcjonalne",
        marketing: "Marketing",
        necessary: "Niezbędne",
      },
      googleAnalytics: {
        description:
          "Usługa analizy stron internetowych oferowana przez Google, która śledzi i raportuje ruch na stronie internetowej, aby pomóc mi zrozumieć, w jaki sposób odwiedzający korzystają z mojej witryny.",
      },
      microsoftClarity: {
        description:
          "Usługa analizy zachowań użytkowników oferowana przez Microsoft, która pomaga zrozumieć, w jaki sposób odwiedzający korzystają z witryny poprzez tworzenie map cieplnych i nagrywanie sesji.",
      },
      cloudflareAnalytics: {
        description:
          "Usługa analizy stron internetowych oferowana przez Cloudflare, która śledzi i raportuje ruch na stronie internetowej, aby pomóc mi zrozumieć, w jaki sposób odwiedzający korzystają z mojej witryny.",
      },
      ok: "Zgadzam się",
      decline: "Odrzucam",
      save: "Zapisz ustawienia",
      service: {
        purpose: "Cel",
        purposes: "Cele",
        required: {
          title: "Wymagane",
          description: "Nie możemy wyłączyć tych usług.",
        },
      },
      poweredBy: "Ogarnięte przez Klaro!",
    },
  },
};

// Upewnij się, że Klaro jest załadowane
document.addEventListener("DOMContentLoaded", function () {
  const manager = klaro.getManager();
  manager.watch({
    update: function (manager, eventType, data) {
      if (eventType === "saveConsents") {
        const { changes, consents, type } = data;
        const uuid = getOrCreateKlaroUUID();

        fetch("https://consent-logger.yourproject.workers.dev/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
            consents,
            page: window.location.href,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    },
  });
});

function getOrCreateKlaroUUID() {
  const existing = getCookie("klaro-uuid");
  if (existing) return existing;

  const newUUID = crypto.randomUUID();
  document.cookie = `klaro-uuid=${newUUID}; path=/; max-age=31536000; SameSite=Lax; Secure`;
  return newUUID;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

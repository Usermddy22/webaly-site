// robots.txt automatique — autorise Google à tout indexer
// ⚠️ Remplace par ton vrai domaine
const SITE_URL = "https://www.webaly.fr";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

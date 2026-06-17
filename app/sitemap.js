// Sitemap automatique — aide Google à découvrir tes pages
// ⚠️ Remplace par ton vrai domaine
const SITE_URL = "https://www.webaly.fr";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

// ════════════════════════════════════════════════════════════
//  SEO — Toutes les balises pour le référencement local
//  ⚠️ Remplace les [valeurs entre crochets] par tes vraies infos
// ════════════════════════════════════════════════════════════

const SITE_URL = "https://www.webaly.fr"; // ⚠️ ton vrai domaine une fois acheté
const BUSINESS_NAME = "Webaly";
const PHONE = "+33771555338"; // 07 71 55 53 38
const EMAIL = "contact@webaly.fr";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Webaly — Création de sites web & CRM sur mesure | Sarthe, Le Mans, Tours, Angers",
    template: "%s | Webaly",
  },
  description:
    "Création de sites web modernes, rapides et optimisés SEO pour les entreprises de la Sarthe, du Maine, de la Touraine et de l'Anjou. Sites vitrines, e-commerce et CRM sur mesure. Devis gratuit sous 24h.",
  keywords: [
    "création site web Sarthe",
    "création site internet Le Mans",
    "agence web Tours",
    "site web Angers",
    "développeur web Pays de la Loire",
    "création site vitrine",
    "site e-commerce",
    "CRM sur mesure",
    "référencement local",
    "Webaly",
  ],
  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: "Webaly — Création de sites web & CRM sur mesure",
    description:
      "Sites web modernes et CRM sur mesure pour les entreprises de la Sarthe et des Pays de la Loire. Devis gratuit sous 24h.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630px — présent dans /public
        width: 1200,
        height: 630,
        alt: "Webaly — Création de sites web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webaly — Création de sites web & CRM sur mesure",
    description:
      "Sites web modernes et CRM sur mesure pour les entreprises de la Sarthe et des Pays de la Loire.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ─── Données structurées Schema.org LocalBusiness ───
// C'est ce qui aide Google à te référencer dans les recherches locales et Maps
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": SITE_URL,
  name: BUSINESS_NAME,
  description:
    "Création de sites web et CRM sur mesure pour les entreprises de la Sarthe et des Pays de la Loire.",
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montval-sur-Loir", // ⚠️ ta ville
    postalCode: "72500", // ⚠️ ton code postal
    addressRegion: "Sarthe",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Le Mans" },
    { "@type": "City", name: "Tours" },
    { "@type": "City", name: "Angers" },
    { "@type": "AdministrativeArea", name: "Sarthe" },
    { "@type": "AdministrativeArea", name: "Pays de la Loire" },
  ],
  serviceType: [
    "Création de site web",
    "Site e-commerce",
    "CRM sur mesure",
    "Référencement local SEO",
    "Refonte de site internet",
  ],
  sameAs: [
    // ⚠️ ajoute tes réseaux sociaux quand tu en as
    // "https://www.linkedin.com/in/...",
    // "https://www.instagram.com/...",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

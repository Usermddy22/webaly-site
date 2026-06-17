# Webaly — Site Next.js (optimisé SEO)

Site de création web avec SEO local optimisé pour la Sarthe et les Pays de la Loire.

## 🚀 Lancer en local

```bash
npm install
npm run dev
```
Puis ouvre http://localhost:3000

## 📦 Construire pour la production

```bash
npm run build
npm start
```

## ⚠️ À PERSONNALISER avant la mise en ligne

Cherche les commentaires `⚠️` dans les fichiers et remplace :

### `app/layout.js` (le plus important pour le SEO)
- `SITE_URL` → ton vrai domaine (ex: https://www.webaly.fr)
- `PHONE` → ton numéro
- `EMAIL` → ton email
- L'adresse (ville, code postal) dans `jsonLd`

### `app/sitemap.js` et `app/robots.js`
- `SITE_URL` → ton vrai domaine

### `components/WebalyLanding.jsx`
- `SCRIPT_URL` → déjà configuré avec ton Google Apps Script ✅

### `/public` (à ajouter)
- `favicon.ico` → l'icône du site (onglet navigateur)
- `og-image.jpg` → image 1200x630px (aperçu sur réseaux sociaux)

## 🌐 Déployer sur Vercel
1. Pousse ce dossier sur GitHub
2. Va sur vercel.com → "Import Project" → choisis ton repo
3. Vercel détecte Next.js automatiquement → clique "Deploy"
4. C'est en ligne ! 🎉

## 📊 Après la mise en ligne (SEO)
1. Crée un compte Google Search Console
2. Ajoute ton site, vérifie la propriété
3. Soumets ton sitemap : `tondomaine.fr/sitemap.xml`
4. Crée une fiche Google Business Profile (essentiel pour le local !)

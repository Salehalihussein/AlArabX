# NightView — adults-only video catalog starter

A responsive, bilingual (English/Arabic) static front-end starter. It is a **catalog UI demo**, not a video host and not a real age-verification system.

## Included
- English default with Arabic toggle and RTL layout
- Search and category filters
- Modal player that accepts provider-authorized embed URLs
- Basic 18+ acknowledgement gate
- Responsive dark interface

## Run locally
Open `index.html` in a browser. No build tools are required.

## Add your own authorized listings
Edit the `videos` array at the top of `app.js`:
- `title`: listing title
- `category`: `featured`, `popular`, or `new`
- `embedUrl`: provider-approved embed URL, or leave blank
- `sourceUrl`: original source page, if permitted

Use only lawful content featuring consenting adults, with documented rights and permission to embed. Respect provider terms, geographic restrictions, takedown requests, and applicable local law. Do not scrape, download, rehost, or bypass restrictions. Add a proper age-assurance and compliance process before public launch; the demo gate alone is not sufficient.

## Publish with GitHub
1. Create a new **private or public repository** on GitHub.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md`.
3. Do not assume GitHub Pages permits adult content. Check the current GitHub terms and hosting-provider policy before publishing. Use a host only after it explicitly confirms that your intended lawful content is allowed.
4. For a public production site, add server-side moderation, reporting/takedown handling, privacy notices, and robust age assurance.

## Important
This starter intentionally contains placeholder cards and no adult media. The sample items have no embed URLs configured.

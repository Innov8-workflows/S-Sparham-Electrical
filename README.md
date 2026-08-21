# S. Sparham Electrical

Static site for S. Sparham Electrical, Ripley, Derbyshire. 33 documents, generated
from `site/`, hosted on Cloudflare Workers static assets.

**Never hand-edit anything in `_site/`.** It is wiped and rewritten on every build.
Change `site/src/` and rebuild.

```bash
npm install
npm run build     # generate + validate
npm run serve     # preview on http://localhost:8141
npm run deploy    # build, then wrangler deploy
```

## Layout

```
wrangler.jsonc          assets-only Worker config (deliberately no "main")
site/
  generate.js           builds _site/: pages, sitemap, robots, llms.txt, _headers
  check.js              post-build validation; the build fails if it finds a problem
  serve.js              local preview, replicating the _headers rules
  make-logo-alpha.sh    rebuilds the transparent logo + favicon from the client's PNG
  make-photos.sh        rebuilds assets/*.jpg from the client's original photographs
  src/
    data.js             SINGLE SOURCE OF TRUTH: business facts, services, areas, reviews
    lib.js              head, header, footer, shared blocks, JSON-LD graph
    pages.js            home, services hub, service pages, areas hub, area pages
    pages-info.js       about, contact, our work, reviews, FAQs, legal, 404
    llms.js             llms.txt
    site.css pages.css site.js
  assets/               real media files, shared by every page
_site/                  build output, gitignored
```

## Rules this site is built on

**Nothing is claimed that the client has not confirmed.** Anything unconfirmed lives
in `pending` in `data.js`, renders with a visible `[Placeholder]` chip, and is
reprinted by the build report on every run. Two claims are banned outright and
`check.js` fails the build if either appears:

- **No competent-person scheme.** The onboarding form lists six qualifications but no
  NICEIC / NAPIT / ELECSA / Stroma membership, so the site never states or implies one.
  `check.js` greps the markup for those names.
- **No prices.** None were supplied.

**Reviews are real and word for word.** They were harvested on 21 August 2026 from
Google, MyBuilder and Facebook. `aggregateRating` uses Google alone (4.9 from 13);
platform scores are never averaged into a composite. `check.js` asserts the markup
matches `data.js`, and that `Review` nodes only appear on pages that actually show
the reviews.

**The homepage carries no FAQ section.** FAQ content lives on `/faqs/` and on the
service pages that own the questions, so only one page claims each FAQPage.

**Every photograph is the client's own work.** The previous site used stock images of
other electricians beside its services; alt text describes what is actually in frame.

## Deploying

`workers_dev` is currently `true` so the site can be seen at
`s-sparham-electrical.<account>.workers.dev`, and `_headers` carries
`X-Robots-Tag: noindex` for that hostname.

When **ssparhamelectrical.co.uk** is registered at GoDaddy and its nameservers point at
Cloudflare:

1. Uncomment the `routes` block in `wrangler.jsonc`.
2. `npm run deploy`.
3. Confirm both custom domains are active in the Cloudflare dashboard.
4. Set `workers_dev` to `false` and deploy again. Leaving it on publishes a second
   complete copy of the site competing with the real domain in search.
5. Add a Redirect Rule 301ing `www` to the apex.

## Still to wire up

The CSP ships as `connect-src 'self'`, which **blocks** both of the following. Widen it
in `generate.js` in the same commit that adds them, because a blocked beacon fails
silently:

1. **Lead log** (`/lead-log`) — Google Sheet + Apps Script, `NOTIFY_TYPES = ['Quote form']`.
   Use `fetch` with `keepalive` + `no-cors` + `text/plain`. Never `navigator.sendBeacon`.
2. **CRM sync** (`/appscript`) — `innov8Forward` goes *after* `notify()`.
3. **GA4** — consent-gated, `click_to_call` / `click_whatsapp` / `generate_lead`.
   `data-track` attributes are already on every call and WhatsApp link.
4. **OG card** (`/link-card`) — `assets/og-default.jpg` is an interim build. A
   replacement needs a **new filename** or the old thumbnail stays cached everywhere.

The privacy policy in `pages-info.js` describes a site that sets no cookies and sends
nothing to a server. It must be rewritten when 1 or 3 lands.

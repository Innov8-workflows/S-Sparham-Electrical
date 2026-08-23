# S. Sparham Electrical — session handover

Paste the block below into a fresh session to carry on.

---

```
Carry on work on the S. Sparham Electrical website. Read
C:\Users\Jay\Projects\s-sparham-electrical\HANDOVER.md and the memory file
project_s_sparham_electrical.md first, then wait for my instructions.
```

Everything below is the state as at 2026-08-23.

---

## What this is

REAL CLIENT. S. Sparham Electrical, Ripley, Derbyshire. Owner **Stephen
("Steve") Sparham**, 07557 448945, stephen_sparham@hotmail.co.uk. Team of 3,
trading 5 years. Brand: cyan `#14AEE3` on near-black `#0B0E12`, Archivo +
Manrope.

**41-page SEO/GEO/AEO site, LIVE at https://ssparhamelectrical.co.uk.**

Built to answer an August 2026 audit of their old `sitelift.site` site
(`K:\AI\innov8 Workflows\Claude v3\S Sparham Electrical\audit.json`), whose
headline finding was *"nothing here tells a customer you are a qualified
electrician"*.

## Where things live

| | |
|---|---|
| Working tree | `C:\Users\Jay\Projects\s-sparham-electrical` (NOT the K: drive — it is cloud-synced and has silently wiped folders before) |
| Repo | `Innov8-workflows/S-Sparham-Electrical` |
| Client media originals | `K:\AI\innov8 Workflows\Claude v2\S. Sparham Electrical` |
| Onboarding form | same folder, `website-onboarding-submission-LD6og0O.pdf` (7 pages, not 52 — the file header lies) |

```
site/generate.js        builds _site/ — pages, sitemap, robots, llms.txt, _headers
site/check.js           post-build validation; the build FAILS on a problem
site/serve.js           local preview, replicates the _headers rules
site/make-photos.sh     rebuilds assets/*.jpg from the K: originals
site/make-video.sh      rebuilds the two clips
site/make-logo-alpha.sh keys the logo transparent + builds the favicon
site/apps-script/Code.gs  SOURCE OF TRUTH for the Apps Script (not Google's editor)
site/src/               data.js lib.js pages.js pages-info.js lighting.js
                        pages-lighting.js llms.js site.css pages.css site.js
_site/                  build output. WIPED EVERY BUILD. Never hand-edit.
_incoming/              where client images get dropped; PROMPTS.md lives here
```

```bash
npm run build     # generate + validate
npm run serve     # http://localhost:8141
npx wrangler deploy
```

## Hosting

Cloudflare Workers, assets-only (deliberately **no `main`** in `wrangler.jsonc` —
adding one stops `_headers` applying and silently drops every security header).
Zone `6727dfa618c912493940f06d69aa7141`, Free plan. Domain bought at GoDaddy,
nameservers moved to `chin`/`cleo.ns.cloudflare.com`. `workers_dev: false`.

Zone config lives in Cloudflare, not the repo: Always Use HTTPS on, Automatic
HTTPS Rewrites on, min TLS 1.2, SSL Full, and a Single Redirect 301ing www to
the apex. **HSTS deliberately still OFF** — ramp it from a short max-age later.

**Cloudflare API token** at `C:\Users\Jay\.cloudflare-token` (Zone:Edit,
DNS:Edit, Zone Settings:Edit, Single Redirect:Edit). The wrangler OAuth token is
**zone:read only** and cannot create zones or rulesets. In the token UI the
redirect permission is called **"Single Redirect"**, not "Dynamic Redirect".

## Hard rules — check.js fails the build if broken

1. **NO competent-person scheme.** The form lists six qualifications but no
   NICEIC / NAPIT / ELECSA / Stroma membership. Those words are grepped for and
   rejected. Never state or imply one.
2. **NO prices, NO opening hours.** Neither was supplied.
3. `aggregateRating` is **Google's alone** (4.9 / 13) and must match `data.js`.
   `Review` nodes only on pages that actually display the reviews.
4. Anything unconfirmed lives in `pending` in `data.js`, renders a visible
   `[Placeholder]` chip, and is reprinted by the build report every run.

**Real ratings, harvested 2026-08-21** — the audit's "5.0 from 53 reviews" was
WRONG: Google 4.9/13 · MyBuilder 5.0/4 · Facebook 100%/5. Eleven reviews are
reproduced word for word.

## Things that cost time this session — read before repeating them

- **Jay's browser reports `prefers-reduced-motion: reduce`.** This caused TWO
  reported bugs: a play button on the before/after clip, and "the hero is not
  looping". Both were reduced-motion accommodations firing. Both are now
  removed. **Test in Brave, not Chrome** — Chrome on this machine does not
  report reduce, so it hides these.
- **`track.js` delivers nothing to the CRM, on every client site, in every
  browser.** `sendBeacon` sends credentialed; `/api/track` replies
  `Access-Control-Allow-Origin: *`; browsers reject that pairing. Preflight
  returns 204 so it looks healthy server-side. Handed to a separate session.
  Also affects A2B and Derby & Nottingham.
- **`$$` and `\n` get mangled through bash heredocs.** `$$('.x')` became
  `$('.x')` and `.join('\n ')` became a real newline, both silently breaking
  the build. Prefer the Write tool for new files, and `node --check` after any
  heredoc patch.
- **Cloudflare edge-caches a 404.** A pre-deploy request for an asset cached
  the miss; re-request with a cache-buster before concluding it did not upload.
- **Measuring text contrast:** you cannot sample inside the text's own bounding
  box — you get glyph anti-aliasing. Hide the foreground first, then sample.

## Verification expectations

`npm run build` must exit 0. Then verify in a **real browser** — puppeteer-core
against installed Chrome AND Brave (`C:\Program Files\BraveSoftware\
Brave-Browser\Application\brave.exe`). The Claude_Browser pane tools time out
when the pane is hidden. Assert `innerWidth` before trusting any mobile
measurement. For video, read `paused` / `currentTime` / `loop` off the element
and watch the counter wrap — do not infer from attributes.

---

# OUTSTANDING WORK

## 1. Lighting images — BLOCKED ON JAY

`_incoming/PROMPTS.md` has copy-paste prompts for **8 images** (a night hero
plus one style plate per guide) and a second batch of option tiles.

Jay generates them in **ChatGPT Plus** (no API — Plus is a consumer
subscription; there is no MCP connector and the registry has none). Higgsfield
has **0 credits on a free plan**; Kling errors on every call.

He saves them into `_incoming/` with the exact filenames. Then:
- resize/re-encode into the asset pipeline
- **restructure the 7 lighting guides to lead with a picture grid** — they are
  currently prose-led, and the client wants a look-book he can point customers
  at, not an advice section
- **remove "Every picture on this website is our own work"** from the homepage
  and `/our-work/` — Jay's explicit decision; it stops being true

## 2. Lead chain — BLOCKED ON JAY

`site/apps-script/Code.gs` is written and configured. Jay must:
1. paste it over the blank script (project `1vFaqOCq9POlHL6_85DkV0Ycigy2cCgAajXLN3zEMg68fNMR67ZenVcxi`)
2. run `innov8Test` once from the editor and click Allow
3. Deploy → Web app → Execute as Me → Anyone, and send the `/exec` URL

Then set `biz.leadEndpoint` in `data.js` and rebuild. **No beacon is emitted
while it is null**, deliberately — a beacon pointing at a dead URL fails
silently and looks exactly like a working site.

Sheet `19dCrVPtgHicdGFT644-jbHXdMcAQwAnHvXUc9QQkhMc`. CRM key
`lk_2e1cd74c79b615d4f713a3090e5309f5`. Beacon type strings are **Title Case**
and must stay identical to `NOTIFY_TYPES`. Never `navigator.sendBeacon`.

## 3. Still to build

- **GA4**, consent-gated, `click_to_call` / `click_whatsapp` / `generate_lead`.
  The `data-track` hooks are already on every call and WhatsApp link. **Widen
  the CSP in the same commit** — `connect-src` currently blocks it silently.
  GA4 also sets cookies, so the privacy policy needs updating again.
- **Proper OG card** via `/link-card`. `assets/og-default.jpg` is an interim
  build. A replacement needs a **new filename** or the old thumbnail stays
  cached everywhere.
- **Search Console** verification + sitemap submission.
- Point the **Google Business Profile** website field at the new domain.

## 4. Open with the client

- **Competent-person scheme** — registered with anyone? Decides Part P
  self-certification, and it is the first thing a homeowner checks.
- **His GBP says BRINSLEY**, everything else says RIPLEY. Direct drag on local
  ranking, two-minute fix on his end.
- **Street address** — the form gave 19 Honey Field Drive DE5 3JL, which looks
  like his home. The site publishes "Ripley, Derbyshire DE5" only.
- **Opening hours** — old site said 07:00–19:00 seven days. Unconfirmed.
- **More photographs** — he offered them on the form and has not sent them.
  Only 11 distinct photos exist. Consumer units, EICRs, CCTV, outdoor lighting
  and industrial work are all unillustrated, and 3 of the 7 lighting guides say
  so on the page.
- **Kitchen case-study details** — the write-up was drafted from the two
  photographs, so it names nothing not visible in frame: no location, no
  duration, no price. Wants his sign-off.
- **Business email** — `info@ssparhamelectrical.co.uk` would read better than
  the Hotmail address the audit flagged.

## 5. Possible follow-ups, not requested

- A **discreet pause toggle** on the hero. It loops with no control, which is
  the considered trade against WCAG 2.2.2. If revisited, a small corner toggle
  is the fix — NOT the browser's control bar, which is what Jay objected to.
- **HSTS**, ramped from a short max-age.
- Ask the three lighting retailers for permission to use their product imagery.
  Free, often granted, and the only route to showing products he can actually
  order. None of them is currently named on the site and none of their imagery
  is used — they are Shopify/Magento shops and it would be infringement.

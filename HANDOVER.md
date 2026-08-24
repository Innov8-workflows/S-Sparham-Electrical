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

Sheet `19dCrVPtgHicdGFT644-jbHXdMcAQwAnHvXUc9QQkhMc`.

**The CRM key is NOT in this repo and must not go back in.** The repo is
public. Add it as a Script Property instead — Apps Script editor → Project
Settings → Script properties → `INNOV8_KEY` = the `lk_...` string from the
Client Dash. Unset, the Sheet row and the email alert still work and only the
CRM hop is skipped, with a warning in the Executions log.

Beacon type strings are **Title Case** and must stay identical to
`NOTIFY_TYPES`. Never `navigator.sendBeacon`.

## 2b. Done since this document was written (2026-08-23)

- The **transformation clip loops**, on the client's instruction. It used to
  stop on the last frame, which is what kept it clear of WCAG 2.2.2.
- **Nineteen more photographs** (`assets-v2`) are in the gallery, taking
  /our-work/ to 27. Consumer units, testing, outdoor lighting, LED strip and
  industrial work are all illustrated now; **CCTV and chandeliers are the only
  gaps left**. Outdoor lighting and LED strip guides got their real photo.
  `MEDIA` in generate.js now derives gallery filenames from data.js.
- **`/review/` exists** — the leave-us-a-review card, modelled on Redline's.
  Source `site/src/pages-review.js`, self-contained, noindex, kept out of the
  sitemap (check.js enforces that both ways now). **It is not `/reviews/`**,
  which is still the public page where reviews are read. Remember the CSP has
  no `script-src 'unsafe-inline'` — that page has zero inline script, and
  anything added later must keep it that way or it fails silently.

## 2c. Also done (2026-08-24)

- **Project 02** on the zig-zag: outdoor wall lights, as a drag-wipe. The two
  shots were taken from different distances; `make-photos.sh` carries the
  solved crops that align them. Do not change one without the other.
- **Mobile pass.** Hero was 78% of a phone screen with 113px of dead video
  under it — now 62%. The quote form's fields were 14.72px, which made iOS
  zoom the page on every tap. Touch targets to 44px. `content-visibility` was
  tried and REVERTED; see the note in site.css before reaching for it again.
- **Closing CTA band is a video** (`cta.mp4`), built by make-video.sh.
- **GA4 `G-7XZBCEYXTR`, consent-gated.** Consent Mode v2 denied by default,
  banner with equal-weight Reject/Accept, no cookie until Accept. The privacy
  policy was rewritten — it previously said the site set no cookies, which the
  tag would have made false. **Google's own snippet does not work here**: it
  is inline, and the CSP has no `script-src 'unsafe-inline'`. The bootstrap is
  at the end of site.js.
- **`/review/` has its own link card** (`og-review.jpg`), source in `site/og/`.
- **Search Console tag** is live on every page from `biz.googleVerification`.

## 2d. Security check (2026-08-24)

Checked against the live site, not assumed. In place: HTTPS enforced (http
301s to https), www 301s to the apex preserving the path, TLS 1.2 minimum with
1.0 refused, and a CSP carrying **no `script-src 'unsafe-inline'`** plus
`frame-ancestors 'none'`, `base-uri 'none'`, `object-src 'none'` and
`form-action 'self'`. Also `X-Content-Type-Options: nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Cross-Origin-Opener-Policy: same-origin` and a locked-down
`Permissions-Policy`. No directory listing, no mixed content, every external
link carries `rel="noopener"`, and `.git/config`, `_headers`, `package.json`,
`wrangler.toml` and the Apps Script source all 404. Exactly one third-party
script loads: the CRM's `track.js`.

**FOUND AND PART-FIXED — the innov8 CRM key was committed in plaintext.**
`site/apps-script/Code.gs` held `INNOV8_KEY` as a string literal, and this
repo is PUBLIC, so it was fetchable by anyone from raw.githubusercontent.com.
Paired with `INNOV8_CRM_URL` in the same file, that is everything needed to
POST invented leads into the Client Dash as this client. It now reads from
Script Properties, and no key literal remains anywhere in the tracked tree.

**The key still needs ROTATING, and only Jay can do it.** Taking it out of
HEAD does not take it out of git history — the old blob is still served by
GitHub, so the string must be treated as burned. Mint a replacement from the
Client Dash (`/api/projects/<id>/lead-key`), revoke the old one, and put the
new value in Script Properties rather than in the file.

Checked and clear: the leads Sheet is **not** world-readable (401 both for the
edit URL and the CSV export), and no sibling client repo carries a `Code.gs`
at all (five checked). The exposure is contained to this one key.

**HSTS is still off**, deliberately — see Hosting above. It is the only
remaining header gap. Ramp it from a short `max-age` rather than shipping a
year, because once browsers have cached the policy it cannot be undone
quickly if anything about the certificate or the apex changes.

## 3. Still to build

- **THE LEAD CHAIN IS NOT CONNECTED.** `biz.leadEndpoint` is still null, so a
  submitted quote form opens WhatsApp and logs NOTHING — no Sheet row, no
  email alert, no CRM lead. Everything else on this list is polish; this one
  is the site not doing its job. `site/apps-script/Code.gs` is ready to paste;
  deploy it and put the /exec URL in data.js. See §2 for the gotchas.
- **track.js is failing on every page load.** `crm.innov8workflows.co.uk/api/track`
  rejects the preflight: `Access-Control-Allow-Origin` is `*` while the request
  sends credentials. It is a CRM-side fix, not a site-side one, and it affects
  every client site carrying track.js — so the Client Dash traffic tiles are
  empty for all of them.
- **Homepage OG card** is still the interim build. `/link-card`'s centred
  layout is now wired up in `site/og/` — the homepage version is the same
  recipe with a different headline. Needs a **new filename**.
- Point the **Google Business Profile** website field at the new domain.
- Search Console: the tag is live, but somebody still has to press **Verify**
  and submit `sitemap.xml`. Use the **apex** as the property, not www — www
  301s to it, so a www property reports every page as a redirect.

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

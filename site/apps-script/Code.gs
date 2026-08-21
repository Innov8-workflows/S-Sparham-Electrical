/**
 * S. Sparham Electrical - website lead logger, email alerts + innov8 CRM sync
 *
 * THIS FILE IS THE SOURCE OF TRUTH. The copy in the Apps Script editor is a
 * deployment of it. Edit here, paste there, commit both together.
 *
 * Script project: 1vFaqOCq9POlHL6_85DkV0Ycigy2cCgAajXLN3zEMg68fNMR67ZenVcxi
 * Sheet:          19dCrVPtgHicdGFT644-jbHXdMcAQwAnHvXUc9QQkhMc
 *
 * Deploy: Web app, Execute as = Me, Who has access = Anyone.
 * On redeploy ALWAYS use Manage deployments -> pencil -> New version, so the
 * /exec URL stays the same. A brand-new deployment mints a different URL and
 * silently orphans the site's beacon.
 *
 * Three destinations, three independent failure modes:
 *   sheet row  <- appendRow
 *   email      <- notify()      , governed by NOTIFY_TYPES
 *   ERP lead   <- innov8Forward(), governed by the per-project lk_ key
 */

/* ============================ CONFIG ============================ */
const SHEET_ID     = '19dCrVPtgHicdGFT644-jbHXdMcAQwAnHvXUc9QQkhMc';
const NOTIFY_TO    = 'jamie@innov8workflows.co.uk';

/* Which action types trigger an email. Everything else still logs silently.
 * These MUST stay identical to the type strings in the site's beacon
 * (site/src/site.js, the sendLead calls) or the alerts silently stop.
 *
 * All four are listed while the site is new: the taps prove the wiring works
 * and show which buttons people actually use. If the call and WhatsApp alerts
 * get noisy once traffic builds, cut this to ['Quote form'] - the rows keep
 * logging to the Sheet and the CRM either way. */
const NOTIFY_TYPES = ['Quote form', 'Call click', 'WhatsApp click', 'Email click'];

/* The type string that means "a real enquiry with contact details", as opposed
 * to a tap. Used to gate the Call button and the CRM identity rules. */
const FORM_TYPE    = 'Quote form';

const BRAND_DARK   = '#0B0E12';                 // email header bar
const BRAND_ACCENT = '#14AEE3';                 // eyebrow text
const BRAND_LABEL  = 'SSPARHAMELECTRICAL.CO.UK';
const BIZ_SHORT    = 'S. Sparham Electrical';

// innov8 CRM. Minted from the Client Dash: /api/projects/<id>/lead-key
const INNOV8_CRM_URL = 'https://crm.innov8workflows.co.uk/api/webhook/client-leads';
const INNOV8_KEY     = 'lk_2e1cd74c79b615d4f713a3090e5309f5';   // unique to this client - do not reuse
/* ================================================================ */

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit';
const HEADERS = ['Timestamp','Type','Name','Phone','Email','Service','Area','Details','Page','Source'];

const Q = String.fromCharCode(34);   // double quote - avoids escaping inside HTML
const APOS = String.fromCharCode(39);

/**
 * Is this a tap rather than a submitted enquiry?
 *
 * Substring, NOT \bclick\b: "call_click" contains an underscore, which is a word
 * character, so a word-boundary anchor silently matches nothing. This site uses
 * Title Case ("Call click"), so the substring test is correct here.
 */
function isEventType_(type) {
  var t = String(type || '').toLowerCase();
  return t.indexOf('click') !== -1 || t.indexOf('tap') !== -1;
}

/**
 * Diagnostic. Throws if the script.send_mail scope is missing.
 * Kept FIRST on purpose: the editor's Run selector updates its label without
 * committing the selection, and defaults to the first function on page load.
 * The number is laggy - use it differentially, never as a count.
 */
function checkMailQuota() {
  Logger.log('Remaining email quota today: ' + MailApp.getRemainingDailyQuota());
}

/**
 * Sheets coerces 07557448945 to the number 7557448945 and strips a leading +.
 * setNumberFormat('@') does NOT prevent this - appendRow parses before the
 * format applies. A leading apostrophe forces text; it is a format marker,
 * stripped from the stored value, so getValue() reads back clean.
 */
function asText(v) {
  v = String(v == null ? '' : v).trim();
  return v ? APOS + v : '';
}

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cell(style, content) {
  return '<td style=' + Q + style + Q + '>' + content + '</td>';
}

function trow(label, value) {
  if (!value) return '';   // omit empty rows rather than showing blanks
  var L = 'padding:10px 14px;border-bottom:1px solid #DBE4EA;color:#5C6B75;'
        + 'font-size:13px;width:110px;vertical-align:top';
  var V = 'padding:10px 14px;border-bottom:1px solid #DBE4EA;color:#1B2A33;'
        + 'font-size:14px;font-weight:bold';
  return '<tr>' + cell(L, label) + cell(V, esc(value).replace(/\n/g, '<br>')) + '</tr>';
}

function notify(d, rowNum) {
  // Wrapped so a mail failure never costs the lead row OR the CRM sync that runs
  // after it. NOTE: this also swallows a missing-scope exception - if emails are
  // not arriving, run checkMailQuota.
  try {
    var type = d.type || 'Website enquiry';
    var who  = d.name || d.source || '';
    var subject = 'New ' + BIZ_SHORT + ' lead: ' + type + (who ? ' - ' + who : '');

    var h = '<div style=' + Q + 'font-family:Arial,Helvetica,sans-serif;max-width:560px' + Q + '>';
    h += '<div style=' + Q + 'background:' + BRAND_DARK + ';padding:18px 20px;'
       + 'border-radius:6px 6px 0 0' + Q + '>';
    h += '<div style=' + Q + 'font-size:11px;letter-spacing:2px;color:' + BRAND_ACCENT + ';'
       + 'font-weight:bold' + Q + '>' + BRAND_LABEL + '</div>';
    h += '<div style=' + Q + 'font-size:22px;color:#ffffff;font-weight:bold;'
       + 'margin-top:4px' + Q + '>' + esc(type) + '</div></div>';

    h += '<table style=' + Q + 'width:100%;border-collapse:collapse;'
       + 'border:1px solid #DBE4EA;border-top:0' + Q + '>';
    h += trow('Name',       d.name);
    h += trow('Phone',      d.phone);
    h += trow('Email',      d.email);
    h += trow('Service',    d.service);
    h += trow('Area',       d.area);
    h += trow('Message',    d.details);
    h += trow('Clicked in', d.source);
    h += trow('Page',       d.page);
    h += '</table>';

    // Only a real enquiry carries the CUSTOMER's number. On a tap d.phone is the
    // CLIENT's own number, so this button would dial Stephen himself.
    if (d.phone && d.type === FORM_TYPE) {
      h += '<div style=' + Q + 'padding:18px 0' + Q + '>'
         + '<a href=' + Q + 'tel:' + esc(String(d.phone).replace(/\s/g, '')) + Q
         + ' style=' + Q + 'background:' + BRAND_ACCENT + ';color:' + BRAND_DARK + ';'
         + 'text-decoration:none;font-weight:bold;padding:12px 26px;'
         + 'border-radius:999px;display:inline-block' + Q + '>Call ' + esc(d.phone)
         + '</a></div>';
    }

    h += '<div style=' + Q + 'color:#7A8892;font-size:12px;padding-top:8px' + Q + '>'
       + 'Row ' + rowNum + ' &middot; <a href=' + Q + SHEET_URL + Q + '>Open the leads sheet</a>'
       + '</div></div>';

    MailApp.sendEmail({ to: NOTIFY_TO, subject: subject, htmlBody: h,
                        name: BIZ_SHORT + ' Website' });
  } catch (err) {
    // swallowed on purpose - see comment above
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(20000); } catch (err) {}
  try {
    var d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) {}

    // Honeypot, if the site sends one. Returns BEFORE anything is recorded, so a
    // bot never reaches the sheet, the inbox or the CRM.
    if (d.botcheck) {
      return ContentService.createTextOutput(JSON.stringify({ ok: true, skipped: 'honeypot' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    // Header init. NOTHING ELSE GOES IN THIS BRANCH - it runs once on an empty
    // sheet and never again. Putting innov8Forward here is how six live scripts
    // ended up never sending a single lead to the CRM.
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }

    sh.appendRow([
      new Date(), d.type || '', d.name || '', asText(d.phone), d.email || '',
      d.service || '', d.area || '', d.details || '', d.page || '', d.source || ''
    ]);

    if (!NOTIFY_TYPES || NOTIFY_TYPES.indexOf(d.type) > -1) notify(d, sh.getLastRow());

    // innov8 CRM lead sync. Deliberately LAST: after the row and after the alert,
    // so a sync problem can never cost a lead or an email. Own try/catch inside,
    // so it cannot throw outward.
    innov8Forward(e, sh);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { lock.releaseLock(); } catch (err) {}
  }
}

function doGet() {
  return ContentService.createTextOutput(BIZ_SHORT + ' lead logger - OK');
}


// ─── innov8 CRM lead sync ────────────────────────────────────────────

function innov8Forward(e, sheet) {
  try {
    var d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) { d = (e && e.parameter) || {}; }
    var rawType = String(d.type || d.event || FORM_TYPE);
    var isEvent = isEventType_(rawType);

    var pick = function () {
      for (var i = 0; i < arguments.length; i++) {
        var v = d[arguments[i]];
        if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
      }
      return '';
    };

    // 'source' included: this site sends the on-page location there.
    var where = pick('form', 'formName', 'where', 'location', 'source');

    var name = [pick('first_name'), pick('last_name')].filter(function (p) { return p; })
                 .join(' ').trim() || pick('name', 'fullname', 'full_name', 'fname', 'contact');

    var message = pick('msg', 'message', 'enquiry', 'details', 'comments', 'notes');
    // Site-specific fields, or they are silently dropped between the sheet and
    // the CRM. This site's quote form sends `service` and `area`.
    var extras = [];
    ['service', 'area', 'address', 'postcode', 'budget', 'timeframe', 'gclid']
      .forEach(function (k) { if (pick(k)) extras.push(k + ': ' + pick(k)); });
    if (extras.length) message = (message ? message + '\n' : '') + extras.join(' · ');

    var lead = {
      name: name,
      email: pick('email', 'emailAddress', 'e-mail'),
      phone: pick('phone', 'tel', 'telephone', 'mobile', 'number'),
      message: message,
      source: rawType.toLowerCase(),
      form_name: where,
      page_url: pick('page', 'page_url', 'url'),
      submitted_at: new Date().toISOString(),
      event_id: ''
    };

    // A tap carries no visitor identity. What it DOES carry is the CLIENT's own
    // contact detail - Stephen's number on a call tap, his address on an email
    // tap - so forwarding those would show him his own details in the CRM as if
    // a customer had left them. Record what was tapped and where instead, and
    // let the row through without an identity so the Client Dash sees volume.
    // A FORM with no contact details at all is still junk and is dropped.
    if (isEvent) {
      var shown = lead.phone || pick('details');
      lead.name = '';
      lead.phone = '';
      lead.email = '';
      lead.message = rawType + (where ? ' - ' + where : '')
                   + (shown ? ' (' + shown + ')' : '');
    } else if (!lead.name && !lead.email && !lead.phone) {
      return;
    }

    // The sheet doPost just wrote to, passed in. getActiveSpreadsheet() returns
    // null in a STANDALONE script (leaving event_id empty, which degrades the
    // CRM's dedup to content+day) and getActiveSheet() returns whichever tab was
    // last VIEWED in a BOUND one. This project is standalone, so the argument is
    // not optional in practice.
    try {
      var sh = sheet || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      if (sh) lead.event_id = sh.getName() + '!' + sh.getLastRow();
    } catch (err2) {}

    var res = UrlFetchApp.fetch(INNOV8_CRM_URL, {
      method: 'post', contentType: 'application/json',
      headers: { 'x-innov8-key': INNOV8_KEY },
      payload: JSON.stringify(lead), muteHttpExceptions: true
    });
    // The Executions log is where a bad key or a rejected payload shows up.
    if (res.getResponseCode() !== 200) console.error('innov8 CRM sync: ' + res.getContentText());
  } catch (err) {
    console.error('innov8 CRM sync error: ' + err);
  }
}

/**
 * Run ONCE from the editor to grant the UrlFetchApp scope + send a deletable
 * test lead. WARNING: this bypasses doPost entirely, so a green 200 proves only
 * that the key and endpoint work. It proves NOTHING about the wiring inside
 * doPost - only a real submission through the live site does that.
 */
function innov8Test() {
  var res = UrlFetchApp.fetch(INNOV8_CRM_URL, {
    method: 'post', contentType: 'application/json',
    headers: { 'x-innov8-key': INNOV8_KEY },
    payload: JSON.stringify({
      name: 'TEST - connection check',
      phone: '00000 000000',
      message: 'If this shows in the CRM the lead sync works. Safe to delete.',
      source: 'form', form_name: 'Setup test',
      event_id: 'innov8-setup-test'
    }),
    muteHttpExceptions: true
  });
  Logger.log(res.getResponseCode() + ' ' + res.getContentText());
}

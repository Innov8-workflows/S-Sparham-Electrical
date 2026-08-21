/* ============================================================
   Content-hashed filenames for the stylesheet and script.

   These two are the only assets that change regularly, and they are each
   referenced from exactly one place (lib.js head() and footer()). Hashing
   them means they can be cached immutably for a year: a change produces a
   new filename, so there is no stale-cache window and no cache busting to
   remember.

   Media keeps stable filenames and a shorter cache, because a photo that
   changes in practice gets a new name anyway.

   Required by BOTH lib.js (to emit the reference) and generate.js (to write
   the file), so the hash is computed once here and shared. This module must
   be loaded before any page is built.
   ============================================================ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = __dirname;
const hash = buf => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);

/* the stylesheet is the base styles plus the inner page styles, concatenated */
const cssSource =
  fs.readFileSync(path.join(SRC, 'site.css'), 'utf8') + '\n' +
  fs.readFileSync(path.join(SRC, 'pages.css'), 'utf8');
const jsSource = fs.readFileSync(path.join(SRC, 'site.js'));

const cssName = `site.${hash(cssSource)}.css`;
const jsName = `site.${hash(jsSource)}.js`;

module.exports = { cssName, jsName, cssSource, jsSource };

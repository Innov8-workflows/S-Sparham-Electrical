#!/usr/bin/env bash
# Render a 1200x630 link-preview card.
#
#   bash render.sh card.html og-card.jpg
#
# Chrome --screenshot is the reliable path on this box. Brave is installed too
# but its --print-to-pdf hangs; ffmpeg drawtext also fails here with
# "Fontconfig error: Cannot load default config file" — all text comes from HTML.

set -euo pipefail

SRC="${1:?usage: render.sh <card.html> [out.jpg]}"
OUT="${2:-og-card.jpg}"

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
[ -x "$CHROME" ] || CHROME="/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
[ -x "$CHROME" ] || { echo "Chrome not found — check the path in render.sh" >&2; exit 1; }

# Chrome needs a real WINDOWS path in the file:// URL.
# Use cygpath -m: bash `pwd` can return a MOUNT path (/tmp/..., /c/...) that
# Chrome cannot resolve — passing that through gives a silent ERR_FILE_NOT_FOUND
# and you get a screenshot of Chrome's error page instead of your card.
ABS="$(cd "$(dirname "$SRC")" && pwd)/$(basename "$SRC")"
if command -v cygpath >/dev/null 2>&1; then
  URL="file:///$(cygpath -m "$ABS")"
else
  URL="file:///$(echo "$ABS" | sed 's|^/\([a-z]\)/|\1:/|')"
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# --virtual-time-budget is MANDATORY: without it the capture happens before the
# Google Fonts webfonts load and you silently get an Arial fallback.
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=9000 \
  --screenshot="$TMP/out.png" "$URL" 2>/dev/null

[ -s "$TMP/out.png" ] || { echo "Chrome produced no screenshot for $URL" >&2; exit 1; }

ffmpeg -v error -y -i "$TMP/out.png" -q:v 3 "$OUT"

SIZE=$(wc -c < "$OUT")
DIMS=$(ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$OUT")
echo "wrote $OUT  ${DIMS}  $(( SIZE / 1024 )) KB"

# 90-160 KB is the normal range at 1200x630. Much smaller usually means the
# photo or the webfonts didn't load — open the file and look before shipping.
[ "$SIZE" -lt 40000 ] && echo "WARNING: suspiciously small — check fonts/photo actually loaded" >&2
[ "$DIMS" = "1200,630" ] || echo "WARNING: expected 1200,630 — check html/body sizing" >&2
exit 0

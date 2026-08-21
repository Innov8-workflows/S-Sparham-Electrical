#!/usr/bin/env bash
# Build site/assets/*.jpg from the client's original photographs.
#
# The originals live outside the repo (they are the only copy of some of them,
# and K: is a cloud-synced drive), so this script takes the source directory
# as an argument and defaults to where they currently sit.
#
# ENCODE AT SOURCE RESOLUTION. Every original here is already modest, at most
# 1440px on the long edge, so nothing is scaled down: downscaling is what makes
# trade photography look cheap, far more than bitrate does. mjpeg -q:v 3 is
# visually transparent at this size and roughly halves the file.
#
# Note on the before/after pair: the client's `a1.jpg` is byte-identical to
# `5.jpg`, so it is not a separate photograph. The real pair is b1.jpg (the
# kitchen stripped back, props and first-fix cable in) and 5.jpg (the same
# kitchen finished), which is why ba-after comes from 5.jpg and not from a1.
set -euo pipefail
cd "$(dirname "$0")"

SRC="${1:-K:/AI/innov8 Workflows/Claude v2/S. Sparham Electrical}"
A=assets
Q="-q:v 3 -pix_fmt yuvj420p"

cp_img () {  # cp_img <source file> <dest name> [extra filters]
  local from="$SRC/$1" to="$A/$2" vf="${3:-}"
  [ -f "$from" ] || { echo "MISSING SOURCE: $from"; return 1; }
  if [ -n "$vf" ]; then
    ffmpeg -y -v error -i "$from" -vf "$vf" $Q "$to"
  else
    ffmpeg -y -v error -i "$from" $Q "$to"
  fi
}

# hero slider: three portrait shots, crossfaded by site.js
cp_img hero.jpg      hero-1.jpg
cp_img hero02.jpg    hero-2.jpg
cp_img hero03.jpg    hero-3.jpg

# the page-header band behind every inner page's <h1>, and the closing CTA
cp_img hero.jpg      hero-poster.jpg
cp_img hero02.jpg    cta.jpg

# gallery, in the order they appear on /our-work/
cp_img 1.jpg         g1.jpg
cp_img 2.jpg         g2.jpg
cp_img 3.jpg         g3.jpg
cp_img 4.jpg         g4.jpg   "crop=1078:1078:0:181"   # portrait EV shot, squared off the middle
cp_img 5.jpg         g5.jpg
cp_img hero.jpg      g6.jpg   "crop=1440:1440:0:320"
cp_img hero03.jpg    g7.jpg   "crop=1440:1440:0:320"
cp_img hero02.jpg    g8.jpg   "crop=1440:1440:0:320"

# before / after: same kitchen, first fix and finished
cp_img b1.jpg        ba-before.jpg
cp_img 5.jpg         ba-after.jpg

# Stephen on site, in branded workwear. This is the only photograph of him we
# have, and the audit's finding was that nobody was named or shown at all.
cp_img about-polished.JPG about.jpg

# The branded workwear flat-lay, overlaid on the owner photo. Worth having: it
# is the only asset that shows the lightning-bolt mark, which the supplied logo
# file does not carry.
cp_img about-small.jpg     about-2.jpg

ls -l "$A" | sed 's/^/  /'
echo
echo "Now run: npm run build"

# ---------------------------------------------------------------------------
# og-default.jpg: the 1200x630 card that appears when the URL is pasted into
# WhatsApp, Messenger, Facebook or iMessage.
#
# This is a plain build: a job photograph, a dark scrim so the wordmark holds
# up, and the keyed logo centred. The /link-card skill replaces it with a
# properly designed card. When it does, the replacement MUST get a new
# filename or the old thumbnail stays in every platform's cache.
# A flat black layer at 52% is used rather than eq=brightness, because
# brightness crushes the shadows to mud while leaving the light wall behind
# the wordmark almost as bright as it started, which is exactly where the
# contrast is needed.
ffmpeg -y -v error \
  -i "$A/hero-2.jpg" -i "$A/logo-hero.webp" \
  -f lavfi -i "color=c=black:s=1200x630" \
  -filter_complex "[0]scale=1200:-1:flags=lanczos,crop=1200:630:0:(ih-630)*0.42,boxblur=3:1[bg];[2]format=rgba,colorchannelmixer=aa=0.55[sc];[bg][sc]overlay=0:0:format=auto[dk];[1]scale=760:-2[lg];[dk][lg]overlay=(W-w)/2:(H-h)/2-18:format=auto" \
  -frames:v 1 -q:v 3 -pix_fmt yuvj420p "$A/og-default.jpg"

ls -l "$A/og-default.jpg"

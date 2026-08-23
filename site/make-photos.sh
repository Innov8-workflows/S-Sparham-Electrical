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
# The closing call-to-action band. Keeps the cta.jpg output name so nothing
# downstream changes; media is served with must-revalidate rather than a long
# TTL, so replacing it in place picks up on the next visit.
cp_img final-hero-cta.jpeg cta.jpg

# gallery, in the order they appear on /our-work/
cp_img 1.jpg         g1.jpg
cp_img 2.jpg         g2.jpg
cp_img 3.jpg         g3.jpg
cp_img 4.jpg         g4.jpg   "crop=1078:1078:0:181"   # portrait EV shot, squared off the middle
cp_img 5.jpg         g5.jpg
cp_img hero.jpg      g6.jpg   "crop=1440:1440:0:320"
cp_img hero03.jpg    g7.jpg   "crop=1440:1440:0:320"
cp_img hero02.jpg    g8.jpg   "crop=1440:1440:0:320"

# ---------------------------------------------------------------------------
# Second batch, sent 2026-08-22 and added to the gallery on 2026-08-23. These
# live in a SUBFOLDER of the originals and are .jpeg, not .jpg, so they take
# their own source dir rather than being renamed into the first batch: the
# numbering collides (1.jpg and 1.jpeg are different photographs).
#
# EVERY GALLERY IMAGE IS SQUARE. The markup declares 900x900, /our-work/ boxes
# them at 3/4 and the homepage at 1/1, both object-fit:cover, so a non-square
# file would advertise the wrong intrinsic ratio and shift the layout. The
# crops below square each one off WITHOUT scaling, keeping full source
# resolution for the lightbox, which shows them up to 88svh tall.
#
# The y offsets are chosen per photograph, not centred by default: a centre
# crop cuts the ceiling out of the shots whose subject IS the ceiling.
S2="$SRC/assets-v2"
cp2 () {  # cp2 <source file> <dest name> <crop>
  local from="$S2/$1" to="$A/$2"
  [ -f "$from" ] || { echo "MISSING SOURCE: $from"; return 1; }
  ffmpeg -y -v error -i "$from" -vf "$3" $Q "$to"
}

cp2 1.jpeg   g9.jpg   "crop=768:768:128:0"      # black kitchen, landscape
cp2 2.jpeg   g10.jpg  "crop=1200:1200:0:60"     # spots on a new ceiling; hold the ceiling
cp2 3.jpeg   g11.jpg  "crop=1200:1200:0:0"      # vaulted ceiling + roof windows; top of frame
cp2 4.jpeg   g12.jpg  "crop=1536:1536:0:120"    # room at plaster stage, lights already live
cp2 5.jpeg   g13.jpg  "crop=1436:1436:2:0"      # outdoor evening lighting
cp2 6.jpeg   g14.jpg  "crop=1100:1100:520:330"  # outdoor socket; tight, or the socket is a speck
cp2 7.jpeg   g15.jpg  "crop=1536:1536:0:256"    # testing at a consumer unit
cp2 8.jpeg   g16.jpg  "crop=1536:1536:0:256"    # outdoor industrial board
cp2 9.jpeg   g17.jpg  "crop=1536:1536:0:256"    # loft room
cp2 10.jpeg  g18.jpg  "crop=1536:1536:0:256"    # EV charger, charging
cp2 11.jpeg  g19.jpg  "crop=1536:1536:0:256"    # green kitchen
cp2 12.jpeg  g20.jpg  "crop=1536:1536:0:256"    # three-phase switch
cp2 13.jpeg  g21.jpg  "crop=1536:1536:0:256"    # utility and porch
cp2 14.jpeg  g22.jpg  "crop=1536:1536:0:256"    # media wall
cp2 15.jpeg  g23.jpg  "crop=1086:1086:0:181"    # night exterior, brick house
cp2 16.jpeg  g24.jpg  "crop=1086:1086:0:181"    # night exterior, garden room
cp2 17.jpeg  g25.jpg  "crop=1536:1536:0:256"    # junction box opened up
cp2 18.jpeg  g26.jpg  "crop=1536:1536:0:150"    # wardrobe LED strip
cp2 19.jpeg  g27.jpg  "crop=1400:1400:80:300"   # new consumer unit; tight, it is the subject

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

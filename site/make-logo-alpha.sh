#!/usr/bin/env bash
# Rebuild the transparent logo assets from the client's logo-polished.png.
#
# The supplied logo is artwork rendered on a solid black plate with no alpha
# channel: white "S. SPARHAM" over cyan "ELECTRICAL", surrounded by a large
# dead margin of pure black.
#
# A black plate is effectively a premultiplied composite (pixel = colour x
# coverage, over black), so alpha can be recovered directly:
#
#   alpha  = max(R, G, B)      the brightest channel is the coverage
#   colour = pixel / alpha     unpremultiply to recover the true colour
#
# Two adjustments on top of the plain version of that:
#
#   * alpha gain of 1.35, clipped at 255. Straight max(R,G,B) leaves the
#     anti-aliased glyph edges and the softer cyan noticeably thin against a
#     bright photograph.
#   * alpha floor: anything under 18 is snapped to 0. The plate carries a JPEG
#     halo of near-zero alpha around every letter which is invisible but very
#     expensive to encode, and it produces a faint grey box over dark hero
#     images if it is left in.
#
# CROP is the measured bounding box of the artwork inside the 1254x1254 plate,
# not a guess: everything outside it is pure black margin.
#
# Do NOT go back to CSS mix-blend-mode:screen for this. It looks identical on
# desktop and renders as a hard black rectangle inside in-app webviews such as
# Facebook Messenger, where the compositing layer stops the blend resolving.
set -euo pipefail
cd "$(dirname "$0")"

SRC="${1:-K:/AI/innov8 Workflows/Claude v2/S. Sparham Electrical/logo-polished.png}"
A=assets
CROP="crop=1208:498:34:390"                      # measured artwork bbox
ALPHA="min(255,1.35*max(max(r(X,Y),g(X,Y)),b(X,Y)))"
MATTE="format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lt($ALPHA,18),0,$ALPHA)',unpremultiply=inplace=1"

# hero lockup
ffmpeg -y -v error -i "$SRC" -vf "$CROP,$MATTE,scale=820:-2:flags=lanczos" \
  -c:v libwebp -q:v 84 -preset drawing -compression_level 6 "$A/logo-hero.webp"

# navbar and footer lockup
ffmpeg -y -v error -i "$SRC" -vf "$CROP,$MATTE,scale=440:-2:flags=lanczos" \
  -c:v libwebp -q:v 84 -preset drawing -compression_level 6 "$A/logo-mark.webp"

# favicon: the full wordmark is unreadable at 32px, so the mark is the "S."
# on its own (measured at x34-196, y390-659 in the plate), white on the brand
# near-black.
#
# The keyed mark is OVERLAID onto a solid tile rather than padded, because
# pad() only fills the ring it adds: the cropped area keeps its own alpha, so
# a padded version comes out as a transparent square inside a dark border and
# renders as a white box in any browser with a light tab bar.
ffmpeg -y -v error \
  -f lavfi -i "color=c=0x0B0E12:s=256x256" \
  -i "$SRC" \
  -filter_complex "[1]crop=163:270:34:390,$MATTE,scale=-2:186:flags=lanczos[m];[0][m]overlay=(W-w)/2:(H-h)/2:format=auto" \
  -frames:v 1 "$A/favicon.png"

ls -l "$A/logo-hero.webp" "$A/logo-mark.webp" "$A/favicon.png"
echo
echo "Now run: npm run build"

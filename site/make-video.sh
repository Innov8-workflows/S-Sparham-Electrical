#!/usr/bin/env bash
# Encode the client's before/after transformation clips for the web.
#
# ENCODE AT SOURCE RESOLUTION. b-a-1.mp4 arrives 1440x1440 and stays 1440x1440.
# Downscaling is what makes trade footage look cheap, far more than bitrate does,
# and this clip is displayed at up to ~760px on a 2x screen so 1440 is not
# excessive. What DOES need dealing with is the bitrate: the original is 23 Mbps,
# which is 13 MB for five seconds and absurd over mobile data.
#
# -movflags +faststart puts the moov atom at the front of the file so playback
# can begin before the whole thing has downloaded. Without it the video is a
# blank box until the last byte lands, which on a phone is most of the point of
# the section gone.
#
# -an strips audio. There is none in the source, and a silent audio track still
# costs bytes and can defeat autoplay policies on some browsers.
set -euo pipefail
cd "$(dirname "$0")"

SRC="${1:-K:/AI/innov8 Workflows/Claude v2/S. Sparham Electrical}"
A=assets

enc () {  # enc <source file> <output name>
  local from="$SRC/$1" to="$A/$2"
  [ -f "$from" ] || { echo "MISSING SOURCE: $from"; return 1; }
  ffmpeg -y -v error -i "$from" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -crf 27 -preset slow -movflags +faststart -an \
    "$to"
  # Poster: the true first frame, so there is no jump between the still the
  # browser shows before playback and the first frame it plays.
  ffmpeg -y -v error -i "$from" -frames:v 1 -q:v 3 -pix_fmt yuvj420p \
    "${to%.mp4}-poster.jpg"
}

enc b-a-1.mp4 ba-1.mp4

ls -l "$A"/ba-1.mp4 "$A"/ba-1-poster.jpg | sed 's/^/  /'
echo
echo "Source was $(ffprobe -v error -show_entries format=size -of csv=p=0 "$SRC/b-a-1.mp4") bytes."
echo "Now run: npm run build"

# ---------------------------------------------------------------------------
# HERO LOOP
#
# hero-01-v1.mp4 is the pendants and coving strip fading up from dark to lit.
# It starts dark and ends bright, so looping it raw snaps from full brightness
# back to black once every ten seconds, which is very visible on a hero.
#
# The fix is to end the clip on the exact frame it starts on: xfade the last
# 1.3s into a held copy of frame 0. The loop point then has nothing to cut
# between. Measured SSIM between the output's first and last frame is 0.958,
# the remainder being compression rather than content.
#
# settb=AVTB on both xfade inputs is not optional. The source is 1/12288 and a
# looped PNG is 1/24, and xfade refuses to configure when the timebases differ:
#   "First input link main timebase do not match the corresponding second"
#
# CRF 28 at the SOURCE 2132x972. 6 MB -> ~800 KB. This one is above the fold on
# the homepage, so its weight is paid by every single visitor.
HERO_XF="[1:v]scale=2132:972,setsar=1,fps=24,format=yuv420p,settb=AVTB[still];\
[0:v]fps=24,format=yuv420p,settb=AVTB[v];\
[v][still]xfade=transition=fade:duration=1.3:offset=8.74,format=yuv420p[out]"

ffmpeg -y -v error -i "$SRC/hero-01-v1.mp4" -frames:v 1 "$A/hero-loop-poster.jpg" -q:v 4
ffmpeg -y -v error -i "$SRC/hero-01-v1.mp4" -loop 1 -framerate 24 -t 1.4 -i "$A/hero-loop-poster.jpg" \
  -filter_complex "$HERO_XF" -map "[out]" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset slow \
  -movflags +faststart -an -r 24 "$A/hero-loop.mp4"

ls -l "$A"/hero-loop.mp4 "$A"/hero-loop-poster.jpg | sed 's/^/  /'

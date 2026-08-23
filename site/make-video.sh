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

#!/bin/bash

# convert reel or shot hd portrait to hd landscape video with zoom and crop
# depends on ffmpeg and imagemagick
# first parameter is the source video
# second parameter can be one from valid imagemagick gravity option for crop


fn=$1
tm=$2
fpx=$(basename $fn .mp4);
nfn="${fpx}_hdv.mp4"

mkdir f
# extract audio for final mixing
ffmpeg -i $fn -vn f/audio.mp3
# extract frames for further processing
ffmpeg -i $fn -an -framerate 30 f/%04d.png

#processing

#pick one random frame to do calculations.
orf=$(ls f/ | shuf | head -1)
sf="f/${orf}"
wh=$(identify -format "%w %h" "$sf")
width=$(echo $wh | awk '{print $1}')
height=$(echo $wh | awk '{print $2}')

# calculations start find height to retain fo 16:9
newht=$(echo "($width / 16) * 9" | bc)

cropto="${width}x${newht}+0+0"

for i in f/*.png ; do magick $i -gravity $tm -crop $cropto -strip -resize 1920x1080 -strip tmp.png; mv -vf tmp.png $i ; done

# create the video
ffmpeg -framerate 30 -i f/%04d.png   -i f/audio.mp3 -c:a copy -c:v libx264 -pix_fmt yuv420p out.mp4
mv -vf out.mp4 $nfn

rm -rf f
dtss=$(date +%s -d "$dtns");

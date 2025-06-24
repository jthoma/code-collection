#!/bin/bash

# embed timestamp on video
# depends on ffmpeg and imagemagick

fn=$1

tstmp=$(basename $fn .mp4);
tdy="${tstmp:0:4}"
tdm="${tstmp:4:2}"
tdd="${tstmp:6:2}"
tth="${tstmp:9:2}"
ttm="${tstmp:11:2}"
sec="${tstmp:13:2}"
dtns="${tdy}-${tdm}-${tdd} ${tth}:${ttm}:${sec}"

dtss=$(date +%s -d "$dtns");

nfn="${tstmp}_tsd.mp4"
# create working dir
mkdir f
# extract audio for final mixing
ffmpeg -i $fn -vn f/audio.mp3
# extract frames for timestamp annotation
ffmpeg -i $fn -an f/%04d.png

# time stamping

fc=1; for i in f/*.png ; do txt=$(date -d @"$dtss" +"%Y-%m-%d %I:%M:%S %P"); magick $i -gravity north -background none -pointsize 50 -annotate +0+8 "$txt" tsm.png; mv -vf tsm.png $i ; fc=$(echo " $fc + 1 " | bc); echo "$fc $sec $i " ; if [ "$fc" -eq 31 ]; then dtss=$( echo " $dtss + 1 " | bc); fc=1 ; fi ; done

# create the video
ffmpeg -framerate 30 -i f/%04d.png   -i f/audio.mp3 -c:a copy -c:v libx264 -pix_fmt yuv420p out.mp4
mv -vf out.mp4 $nfn


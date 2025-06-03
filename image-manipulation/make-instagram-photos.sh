#!/bin/bash

# As of 2017 Feb, Instagram allows multiple photos to be posted side by side. 
# @idealisms posted some panoramas split up into separate photos. 
# I wrote this script to generate those square photos from a panorama.

if [ -z "$1" ]; then
    echo "Usage: $0 filename.jpg"
    exit
fi

filename="$1"

# NOTE: I use 'identify' and 'convert' from ImageMagick

# Original image size
width=$(identify -format "%w" "$filename")
height=$(identify -format "%h" "$filename")

# Each of the square pieces will be 1/Nth the width
N=$[$width / $height]
if [ $N -gt 10 ]; then N=10; fi  # maximum 10 allowed by instagram

size=$[$width / N]
if [ $height -lt $size ]; then size=$height; fi

    
# Use the center of the x,y range
x_offset=$[$[$width - $size * N] / 2]
y_offset=$[$[$height - $size] / 2]


echo  "$filename : ${width}x${height}, $N parts"

if [ $x_offset -gt 0 ]; then
    echo "Wide image; truncating $[2 * $x_offset] pixels"
else
    x_offset=0
fi

if [ $y_offset -gt 0 ]; then
    echo "Tall image; truncating $[2 * $y_offset] pixels"
else
    y_offset=0
fi

dirname=${filename/.jpg/}
mkdir -p "$dirname"
for part in $(seq $[$N - 1] -1 0); do
    crop="${size}x${size}+$[${x_offset} + ${size}*${part}]+${y_offset}"
    echo "  part $part : $crop"
    convert "$filename" -crop "$crop" "$dirname"/"$part".jpg
done

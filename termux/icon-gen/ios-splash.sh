#!/bin/bash

base=$1

convert -verbose -resize 75x75 $base $TMP/overlay00.png
convert -verbose -resize 150x150 $base $TMP/overlay0.png
convert -verbose -resize 300x300 $base $TMP/overlay1.png

convert -verbose -size 640x1136 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay1.png Default-568h@2x~iphone.png
rm -f $TMP/transparent.png

convert -verbose -size 750x1334 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay0.png Default-667h.png
rm -f $TMP/transparent.png

convert -verbose -size 1242x2208 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay0.png Default-736h.png
rm -f $TMP/transparent.png

convert -verbose -size 2208x1242 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay0.png Default-Landscape-736h.png
rm -f $TMP/transparent.png

convert -verbose -size 2048x1536 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay1.png Default-Landscape@2x~ipad.png
rm -f $TMP/transparent.png

convert -verbose -size 1024x768 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay0.png Default-Landscape~ipad.png
rm -f $TMP/transparent.png

convert -verbose -size 1536x2048 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay1.png Default-Portrait@2x~ipad.png
rm -f $TMP/transparent.png

convert -verbose -size 768x1024 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay0.png Default-Portrait~ipad.png
rm -f $TMP/transparent.png

convert -verbose -size 640x960 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay1.png Default@2x~iphone.png
rm -f $TMP/transparent.png

convert -verbose -size 320x480 xc:transparent $TMP/transparent.png
convert -verbose -composite -gravity center $TMP/transparent.png $TMP/overlay00.png Default~iphone.png
rm -f $TMP/transparent.png


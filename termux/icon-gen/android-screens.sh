#!/bin/bash

base=$1

drawable()
{
   ts="$3"
   convert -resize ${ts}x${ts} $1 /dev/shm/fg.png 
   convert -size $2 plasma:fractal /dev/shm/src.png
   convert /dev/shm/src.png -virtual-pixel tile  -blur 0x10 -paint 3 /dev/shm/bg.png
   convert -verbose -composite -gravity center /dev/shm/bg.png /dev/shm/fg.png $4

   rm -f /dev/shm/src.png
   rm -f /dev/shm/bg.png
   rm -f /dev/shm/fg.png

}

drawable $base 200x320 100 "drawable-port-ldpi-screen.png"
drawable $base 320x480 160 "drawable-port-mdpi-screen.png"
drawable $base 480x720 240 "drawable-port-hdpi-screen.png"
drawable $base 720x960 360 "drawable-port-xhdpi-screen.png"
drawable $base 640x960 320 "drawable-port-xxhdpi-screen.png"
drawable $base 960x1440 480 "drawable-port-xxhdpi-screen.png"
drawable $base 1280x1920 640 "drawable-port-xxxhdpi-screen.png"


drawable $base 320x200 100 "drawable-land-ldpi-screen.png"
drawable $base 480x320 160 "drawable-land-mdpi-screen.png"
drawable $base 720x480 240 "drawable-land-hdpi-screen.png"
drawable $base 960x640 320 "drawable-land-xhdpi-screen.png"
drawable $base 1440x960 480 "drawable-land-xxhdpi-screen.png"
drawable $base 1920x1280 640 "drawable-land-xxxhdpi-screen.png"


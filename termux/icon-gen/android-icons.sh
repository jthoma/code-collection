#!/bin/bash
base=$1

  convert "$base" -resize 36x36!    "drawable-ldpi-icon.png"
  convert "$base" -resize 48x48!    "drawable-mdpi-icon.png"
  convert "$base" -resize 72x72!    "drawable-hdpi-icon.png"
  convert "$base" -resize 96x96!    "drawable-xhdpi-icon.png"
  convert "$base" -resize 144x144!  "drawable-xxhdpi-icon.png"
  convert "$base" -resize 192x192!  "drawable-xxxhdpi-icon.png"


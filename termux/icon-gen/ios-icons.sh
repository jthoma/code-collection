#!/bin/bash
base=$1

 convert "$base" -resize 57x57!  "icon.png"
 convert "$base" -resize 114x114!  "icon@2x.png"
 convert "$base" -resize 40x40!  "icon-40.png"
 convert "$base" -resize 80x80!  "icon-40@2x.png"
 convert "$base" -resize 50x50!  "icon-50.png"
 convert "$base" -resize 100x100!  "icon-50@2x.png"
 convert "$base" -resize 60x60!  "icon-60.png"
 convert "$base" -resize 120x120!  "icon-60@2x.png"
 convert "$base" -resize 180x180!  "icon-60@3x.png"
 convert "$base" -resize 72x72!  "icon-72.png"
 convert "$base" -resize 144x144!  "icon-72@2x.png"
 convert "$base" -resize 76x76!  "icon-76.png"
 convert "$base" -resize 152x152!  "icon-76@2x.png"
 convert "$base" -resize 29x29!  "icon-small.png"
 convert "$base" -resize 58x58!  "icon-small@2x.png"
 convert "$base" -resize 87x87!  "icon-small@3x.png"

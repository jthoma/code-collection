#!/bin/bash

  convert "$1" -resize 200x320    "drawable-port-ldpi-screen.png"
  convert "$1" -resize 320x480    "drawable-port-mdpi-screen.png"
  convert "$1" -resize 480x720    "drawable-port-hdpi-screen.png"
  convert "$1" -resize 720x960    "drawable-port-xhdpi-screen.png"
  convert "$1" -resize 640x960   "drawable-port-xxhdpi-screen.png"
  convert "$1" -resize 960x1440   "drawable-port-xxhdpi-screen.png"
  convert "$1" -resize 1280x1920   "drawable-port-xxxhdpi-screen.png"

  convert "$2" -resize 320x200    "drawable-land-ldpi-screen.png"
  convert "$2" -resize 480x320    "drawable-land-mdpi-screen.png"
  convert "$2" -resize 720x480    "drawable-land-hdpi-screen.png"
  convert "$2" -resize 960x640    "drawable-land-xhdpi-screen.png"
  convert "$2" -resize 1440x960    "drawable-land-xxhdpi-screen.png"
  convert "$2" -resize 1920x1280    "drawable-land-xxxhdpi-screen.png"


## My contributions to developers working in Android and Termux

[AWS EC2 Management Scripts for Termux](./aws/)


## [🎨 Icon & Splash Screen Generator Scripts (Termux Edition)](./icon-gen/)

A collection of Bash scripts for generating **Android** and **iOS** icons and splash screens from a base image. Designed to work inside a Termux environment using `ImageMagick`.

## 📦 Requirements

- [ImageMagick](https://imagemagick.org)
- `$TMP` environment variable should be defined (used for temporary file storage).

**In Termux:**  
`$TMP` is automatically set to:

```bash
/data/data/com.termux/files/usr/tmp
```

**In Ubuntu/Linux desktops:**  
You may need to manually export it before running `ios-splash.sh`:
- This  could give a slightly better performance as /dev/shm is a ramdisk and by default it could be half of active memory and you should consider that also before assigning this one as that might be a limitation, though linx also has it already defined as '/tmp' and globally writable by anybody
```bash
export TMP=/dev/shm
```

### Install ImageMagick

```bash
# Termux
pkg install imagemagick

# Ubuntu/Debian
sudo apt install imagemagick
```

---

## 📁 Scripts Overview

### 📱 `android-icons.sh`
Generate Android app launcher icons in multiple resolutions.

**Usage:**
```bash
bash android-icons.sh base.png
```

**Output:**
- `drawable-ldpi-icon.png` (36x36)
- `drawable-mdpi-icon.png` (48x48)
- `drawable-hdpi-icon.png` (72x72)
- `drawable-xhdpi-icon.png` (96x96)
- `drawable-xxhdpi-icon.png` (144x144)
- `drawable-xxxhdpi-icon.png` (192x192)

---

### 🖼 `android-screens.sh`
Generate stylized background screens for various Android screen densities using fractals and blur effects.

**Usage:**
```bash
bash android-screens.sh base.png
```

**Output:**
- `drawable-port-*-screen.png` (portrait)
- `drawable-land-*-screen.png` (landscape)

---

### 🚀 `android-splash.sh`
Generate plain Android splash screens (resized from image without effects).

**Usage:**
```bash
bash android-splash.sh portrait.png landscape.png
```

**Output:**
- Portrait splash screens: `drawable-port-*.png`
- Landscape splash screens: `drawable-land-*.png`

---

### 🍏 `ios-icons.sh`
Generate all required iOS icons (including Retina, iPad, settings, etc.).

**Usage:**
```bash
bash ios-icons.sh base.png
```

**Output:**
- Icons from `29x29` to `180x180` including `@2x` and `@3x` variants.

---

### 💡 `ios-splash.sh`
Generate iOS splash screens for different device resolutions with transparent backgrounds.

**Usage:**
```bash
bash ios-splash.sh base.png
```

**Output:**
- `Default-568h@2x~iphone.png`
- `Default-667h.png`
- `Default-736h.png`
- `Default-Landscape-736h.png`
- `Default-Landscape@2x~ipad.png`
- `Default-Landscape~ipad.png`

---

## 📁 Directory Structure

```
termux/
└── icon-gen/
    ├── android-icons.sh
    ├── android-screens.sh
    ├── android-splash.sh
    ├── ios-icons.sh
    ├── ios-splash.sh
    └── README.md
```

---

## 📜 License

You can choose to license this as MIT or simply release it publicly without restriction. Example for MIT:

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## ✅ Notes

- Ensure input images have transparent or square-safe margins to avoid distortion.
- Use `.png` images with alpha transparency for best results.
- All these are doable in an Android Phone when installed with proper free tools 


## Started working with nginx on termux since June 10, 2025

How I managed it is 

- pkg update
- pkg install nginx

- mkdir -p $TMP/nginx/www
- nano nginx/nginx.conf

# web-dev/nginx.conf
  This one is the configuration file which I am using and
all the caching is switched off as this is for development
purposes only.

- nginx -c $TMP/nginx/nginx.conf - to start
- nginx -s stop - to stop

# web-dev/jdebug.js — Jiju's Debug Inspector 🛠️

A tiny, zero-dependency JavaScript utility to inspect values in-page when traditional debugging tools aren't available. Built specifically for mobile-first development using **Termux**, **nano**, and a **mobile browser** — and now enhanced with an **NGINX local server**.

## ✨ Why jdbg?

While developing small HTML/JS projects on Android via Termux, I needed a way to inspect variables and debug flow — but without access to browser dev tools.

`console.log()`? Not visible.  
`alert()`? Obnoxious.  
**`jdbg.inspect()`? Just right.**


## 🚀 Features

- 🧠 **Simple**: Just drop in the script, call `jdbg.inspect(value)`
- 📱 **Mobile-optimized**: Works directly in any mobile browser
- ⚙️ **Self-contained**: No libraries, no console needed
- 🔁 **Reusable**: Only creates one debug area per session
- 💡 **Append-friendly**: Keeps previous messages (can be customized)

---

## 🔧 How to Use

1. Add `jdbg.js` to your project:
   ```html
   <script src="jdbg.js"></script>

# media/ media management and further in Android and Termux

** cli can be clumsy but is precise and really fast when done correctly.

# media/tsv.sh - timestamping those videos from different capture devices

just pass the video file as argument which has the android format of file naming convention with the filename part before '_' as the starting timestamp.
note that this is designed for youtube shorts or facebook reels and essentially will handle only second increments and will fail if the higher derivatives has to change in the video. 
an update on June 24 overcomes this limitation and now video of any duration can be automatically done 


# 🎨 Icon & Splash Screen Generator Scripts (Termux Edition)

A collection of Bash scripts for generating **Android** and **iOS** icons and splash screens from a single base image. These scripts are optimized for the **Termux** environment on Android, but they can also be used on any Linux desktop with `ImageMagick` installed.

-----

## ✨ Features

  * **Android Icon Generation:** Create app launcher icons for all standard screen densities (`ldpi` to `xxxhdpi`).
  * **Android Splash Screens:** Generate plain splash screens or stylized fractal backgrounds for both portrait and landscape orientations.
  * **iOS Asset Generation:** Produce a full set of icons and splash screens for various iOS devices and resolutions, including Retina and iPad.
  * **Cross-Platform Compatibility:** Works seamlessly on Termux and other Linux environments like Ubuntu/Debian.
  * **Simple Command-Line Usage:** Easy-to-use Bash scripts that run with a single command.

-----

## 📦 Requirements

  * **ImageMagick:** A powerful command-line image manipulation tool.
  * **Bash:** A standard Unix shell.

### Installation

First, you need to install **ImageMagick** on your system:

```bash
# For Termux
pkg install imagemagick

# For Ubuntu/Debian
sudo apt install imagemagick
```

### Environment Variable (`$TMP`)

These scripts use the `$TMP` environment variable for temporary file storage.

  * **In Termux**, this is automatically defined, so no action is needed.
  * **On Ubuntu/Linux desktops**, it's usually set to `/tmp`. For better performance, you can optionally export it to a RAM disk (e.g., `/dev/shm`), but be mindful of memory limitations.

<!-- end list -->

```bash
# Optional: Export TMP to a RAM disk for better performance
export TMP=/dev/shm
```

-----

## 🚀 Getting Started

Clone the repository to your local machine to get the scripts:

```bash
git clone https://github.com/jthoma/code-collection.git
cd code-collection/termux/icon-gen
```

-----

## 📁 Scripts & Usage

Each script is designed for a specific task. Just run the script with your input image(s) as arguments.

### **`android-icons.sh`**

Generate Android app launcher icons for all standard screen densities from a base `.png` image.

**Usage:**

```bash
bash android-icons.sh path/to/your/base_icon.png
```

**Output:**
Icons will be generated in the current directory with names like `drawable-mdpi-icon.png`, `drawable-hdpi-icon.png`, etc.

### **`android-screens.sh`**

Create stylized Android background screens with fractal and blur effects for different screen densities.

**Usage:**

```bash
bash android-screens.sh path/to/your/base_image.png
```

**Output:**
Portrait (`drawable-port-*.png`) and landscape (`drawable-land-*.png`) screens will be generated.

### **`android-splash.sh`**

Generate simple Android splash screens by resizing input images without any additional effects.

**Usage:**

```bash
bash android-splash.sh path/to/portrait_image.png path/to/landscape_image.png
```

**Output:**
Splash screens will be created for different resolutions for both portrait and landscape orientations.

### **`ios-icons.sh`**

Generate a complete set of iOS icons for various devices, including Retina, iPad, and settings.

**Usage:**

```bash
bash ios-icons.sh path/to/your/base_icon.png
```

**Output:**
Icons will be created in sizes from `29x29` to `180x180`, including `@2x` and `@3x` variants.

### **`ios-splash.sh`**

Generate iOS splash screens for different device resolutions with transparent backgrounds.

**Usage:**

```bash
bash ios-splash.sh path/to/your/base_image.png
```

**Output:**
Splash screens like `Default-568h@2x~iphone.png`, `Default-667h.png`, etc.

-----

## ✅ Important Notes

  * **Input Image Format:** Use `.png` images with alpha transparency for the best results.
  * **Margins:** Ensure your input images have transparent margins or a square-safe design to prevent distortion during resizing.
  * **Run on Android:** All these scripts can be run directly on an Android device using the Termux app with `ImageMagick` installed\!


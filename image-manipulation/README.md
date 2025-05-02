# Image Manipulation Scripts

This folder contains scripts for efficient image manipulation, specifically designed for resizing images to a target megapixel count. It includes scripts for both the resizing process and validation of the resized images.

## Scripts

### 1. `rzcmd.php`

* **Purpose:** Calculates the percentage by which an image should be resized to achieve a target megapixel count.
* **Location:** `image-manipulation/rzcmd.php`
* **Code:**

    ```php
    <?php
    
    $w = $argv[1];       // Original image width
    $h = $argv[2];       // Original image height
    $tp = $argv[3];      // Target megapixel count
    
    $targetPixels = $tp * 1000000;  // Target pixels
    $currentPixels = $w * $h;         // Current pixels
    
    $scaleFactor = sqrt($targetPixels / $currentPixels);
    $resizePercentage = $scaleFactor * 100;
    
    echo round($resizePercentage) . '%'; // Output: Percentage with '%'
    ?>
    ```

### 2. `rzcheck.php`

* **Purpose**: Calculates the megapixel count of an image, given its width and height. Useful for verifying the output of the resizing process.
* **Location**: `image-manipulation/rzcheck.php`
* **Code**:

    ```php
    <?php
    
    $w = $argv[1];       // Image width
    $h = $argv[2];       // Image height
    
    $factor = 1000000;    // 1 megapixel = 1,000,000 pixels
    $currentPixels = $w * $h;
    
    echo round($currentPixels / $factor) , "\n"; // Output: Megapixel count, newline
    ?>
    ```

## Setup

### Prerequisites

* **PHP:** Required for executing the PHP scripts.
* **ImageMagick:** Required for image identification and manipulation. The `magick` command-line tool is used.

### Installation

#### Ubuntu

1.  **Install PHP:**

    ```bash
    sudo apt update
    sudo apt install php-cli
    ```

2.  **Install ImageMagick:**

    ```bash
    sudo apt install imagemagick
    ```

#### Termux (Android)

1.  **Install Termux:**
    * Install the Termux app from F-Droid (recommended) or the Google Play Store.

2.  **Install PHP:**

    ```bash
    pkg update
    pkg install php
    ```

3.  **Install ImageMagick:**

    ```bash
    pkg install imagemagick
    ```

## Usage

### 1. Resizing Images

The resizing process involves a combination of shell commands and the `rzcmd.php` script.

#### Steps

1.  **Prepare your images:** Place the images you want to resize in a directory. For example, create a directory named `original_images`.

2.  **Create a destination directory:** Create a directory where the resized images will be saved. For example, create a directory named `resized_images`.

    ```bash
    mkdir resized_images
    ```

3.  **Navigate to the directory containing your images:**

    ```bash
    cd <path/to/your/images>
    ```

4.  **Create a list of image files:**

    ```bash
    find . -maxdepth 1 -type f -print > dirlist.txt
    ```

    * This command creates a file named `dirlist.txt` in the current directory, containing a list of the image files.

5.  **Resize the images:**

    ```bash
    TARGET_MP=50 # Set the target megapixel count
    while read -r filename; do
        dimensions=$(magick identify -format "%w %h" "$filename")
        resize_percent=$(php -q <path/to/rzcmd.php> $dimensions $TARGET_MP)
        magick "$filename" -resize "$resize_percent" "<path/to/resized_images>/$(basename "$filename")"
        echo "Resized: $filename to $TARGET_MP MP"
    done < dirlist.txt
    ```

    * `TARGET_MP`:Pass the desired target megapixel count (e.g., 50) as the thrird parameter.
    * `while read -r filename; do ... done < dirlist.txt`: This loop reads each filename from `dirlist.txt`.
    * `dimensions=$(magick identify -format "%w %h" "$filename")`: Gets the width and height of the current image.
    * `resize_percent=$(php -q <path/to/rzcmd.php> $dimensions $TARGET_MP)`: Calls `rzcmd.php` to calculate the resize percentage. **Important:** Replace `<path/to/rzcmd.php>` with the actual path to the `rzcmd.php` script.
    * `magick "$filename" -resize "$resize_percent" "<path/to/resized_images>/$(basename "$filename")"`: Resizes the image using ImageMagick and saves it to the `resized_images` directory. `$(basename "$filename")` ensures the resized image keeps the original filename. **Important:** Replace `<path/to/resized_images>` with the actual path.
    * `echo "Resized..."`: Prints a message indicating that the image has been resized.

### 2. Validating Resized Images

After resizing, you can use the `rzcheck.php` script to verify the megapixel count of the resized images.

#### Steps

1.  **Navigate to the directory containing the resized images:**

    ```bash
    cd <path/to/resized_images>
    ```

2.  **Run the validation command:**

    ```bash
    for image in *; do
        dimensions=$(magick identify -format "%w %h" "$image")
        echo -n "$image: "
        php -q <path/to/rzcheck.php> $dimensions
    done
    ```

    * This command iterates through the files in the current directory (the directory with resized images).
    * `dimensions=$(magick identify -format "%w %h" "$image")`: Gets the width and height of the image.
    * `echo -n "$image: "`: Prints the image filename, followed by a colon and a space.
    * `php -q <path/to/rzcheck.php> $dimensions`: Executes `rzcheck.php` to calculate and print the megapixel count. **Important:** Replace `<path/to/rzcheck.php>` with the actual path.

### 3. Cleaning Up

To remove all the generated files

```bash
rm -rf resized_images dirlist.txt
```

### 4. Compatiability

The author have personally tested these scripts and more from the [Termux section](../termux/) on multiple devices like Samsung Galaxy Tab S7 FE with full keyboard book case cover, Samsung Galaxy M14 5g with builtin soft keyboard, and Samsung Galaxy A54 with bluetooth keyboard BK 3001 

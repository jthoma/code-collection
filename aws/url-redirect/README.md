# url-redirect: Serverless URL Shortener using AWS S3

This shell script (`compress.sh`) automates the creation of short URLs using an AWS S3 bucket configured for website hosting. It leverages S3's redirection capabilities, eliminating the need for any server-side processing code.

## Key Features

* **Serverless:** No need to manage or maintain any servers.
* **Cost-Effective:** Utilizes the scalability and cost-efficiency of AWS S3.
* **Simple Setup:** Relies on a basic S3 bucket configured for website hosting.
* **Automated Creation:** Simplifies the process of generating short URLs.
* **Optional Custom Short IDs:** You can provide a desired short identifier, or the script will generate a unique one based on the MD5 hash of the full URL.
* **Checks for Existing Shortened URLs:** Prevents duplicate short URLs for the same long URL.
* **Verifies Redirection:** Confirms that the short URL correctly redirects to the intended long URL.
* **Optimized for Termux and Ubuntu:** Uses environment variables and paths common in these environments.

## Prerequisites

* **AWS CLI:** The AWS Command Line Interface must be installed and configured with credentials that have `s3:GetObject`, `s3:PutObject`, and `s3:ListBucket` permissions for your target S3 bucket.
* **S3 Bucket:** You need an existing AWS S3 bucket configured for static website hosting (accessible via HTTP). For HTTPS, you can use Amazon CloudFront to deliver your S3 content with SSL/TLS.
* **`.config` File:** A `.config` file in the same directory as the `compress.sh` script containing your S3 bucket name, short URL prefix, and temporary directory path.

## Setup

1.  **Clone the repository (or download the `compress.sh` and `.config` files):**
    ```bash
    git clone [https://github.com/your-username/code-collection](https://github.com/your-username/code-collection)
    cd code-collection/aws/url-redirect
    ```

2.  **Create and configure the `.config` file:**
    Create a file named `.config` in the same directory as `compress.sh` and populate it with your specific details:
    ```
    # Only the bucket name
    BUCKET_NAME="your-s3-bucket-name"

    # Website domain (HTTP if direct S3, HTTPS if using CloudFront)
    SHORT_PREFIX="[https://your-domain.com](https://your-domain.com)"

    # Temp path for reading contents (Termux: $PREFIX/tmp/, Linux: /tmp/ or /dev/shm/)
    TMPDIR="$PREFIX/tmp/"
    ```
    **Note:** Replace `your-s3-bucket-name` and `https://your-domain.com` with your actual bucket name and desired short URL prefix. Adjust `TMPDIR` if needed for your environment.

3.  **Make the script executable:**
    ```bash
    chmod +x compress.sh
    ```

## Usage

```bash
./compress.sh <FULL_URL> [SHORT_ID]
```

## Disclaimer 

Though the script is my work, the idea behind is from an aws blogs article.
[Read it here](https://aws.amazon.com/blogs/compute/build-a-serverless-private-url-shortener/)

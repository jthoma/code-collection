# AWS EC2 Management Scripts for Termux

This repository contains a set of Bash scripts designed to simplify the management of an AWS EC2 instance from a Termux environment on Android. These scripts leverage the AWS CLI to start, describe, and connect to an EC2 instance, focusing on ease of use and efficiency for mobile-based development and administration.

## Purpose

The primary goal of these scripts is to provide a streamlined workflow for:

* **Starting and connecting to an EC2 instance:** Quickly initiate an EC2 instance for on-demand processing power or access to VPC resources (databases, S3).
* **Automated resource management:** Employing an [auto-shutdown mechanism on the EC2 instance](../../aws/ec2-inactivity-shutdown/) to minimize costs when not in use.
* **Mobile-friendly operation:** Providing a simple command-line interface suitable for Termux.

## Setup

1.  **AWS CLI Installation:**
    * Ensure the AWS CLI is installed and configured within your Termux environment. You can install it using `pip install awscli`.
    * The scripts rely on the AWS CLI being correctly configured with your AWS credentials.

2.  **Credentials File (`credentials.txt`):**
    * Create a file named `credentials.txt` in your `~/aws/` directory (or a directory of your choice).
    * Populate the file with your AWS credentials and instance details, following the structure below:

    ```bash
    export AWS_DEFAULT_REGION=[Your Region ID]
    export AWS_ACCESS_KEY_ID=[Your Access Key ID]
    export AWS_SECRET_ACCESS_KEY=[Your Secret Access Key]
    export AWS_SECURITY_GROUP=[Your Security Group ID]
    export AWS_SSH_ID=[Path to your .pem key]
    export AWS_ACCOUNT=[Your AWS Account Number]
    export EC2ID=[Your EC2 Instance ID]
    ```

    * **Important:** Store this file securely and avoid committing it to version control.

3.  **Script Placement:**
    * Place the provided shell scripts (`1.sh`, `2.sh`, `3.sh`, `4.sh`, `5.sh`) in the `~/aws/ec2/` directory.

4.  **Permissions:**
    * Make the scripts executable using `chmod +x ~/aws/ec2/*.sh`.

## Script Descriptions

* **`1.sh`:**
    * Starts the specified EC2 instance using the AWS CLI:
    * `aws ec2 start-instances --instance-id "$EC2ID"`
    * This script initiates the EC2 instance, making it available for connection.

* **`2.sh`:**
    * Describes the EC2 instance and saves the output to `ooo.txt`:
    * `aws ec2 describe-instances --instance-id "$EC2ID" > ooo.txt`
    * This script is typically executed after a short delay (15-20 seconds) to allow the instance to start. The output is parsed by subsequent scripts to retrieve the public IP address and instance state.

* **`3.sh`:**
    * Extracts the public IP address from `ooo.txt` and establishes an SSH connection:
    * `PIP=$(grep PublicIp ooo.txt | tail -1 | awk -F '"' '{print $4}')`
    * `ssh -i $AWS_SSH_ID -o "StrictHostKeyChecking no" -o "UserKnownHostsFile=/dev/null" ubuntu@$PIP -v`
    * This script automates the SSH connection, bypassing host key checking for convenience in a mobile environment. The `-v` flag provides verbose output for debugging.

* **`4.sh`:**
    * Generates an SSH or SCP command string with the necessary parameters:
    * `PIP=$(grep PublicIp ooo.txt | tail -1 | awk -F '"' '{print $4}')`
    * `echo "-i $AWS_SSH_ID -o ::StrictHostKeyChecking no:: -o ::UserKnownHostsFile=/dev/null:: ubuntu@$PIP " | sed -e 's/::/"/g'`
    * This script provides a copy-paste-friendly command for SSH or SCP, useful for transferring files or connecting manually.

* **`5.sh`:**
    * Retrieves the current state of the EC2 instance (e.g., "running", "stopped"):
    * `grep -A3  '"State"' ooo.txt | grep "Name" | awk -F '"' '{print $4}'`
    * This script allows you to quickly check the instance status.

## Usage

1.  **Load Credentials:**
    * `source ~/aws/credentials.txt`

2.  **Start the Instance:**
    * `~/aws/ec2/1.sh`

3.  **Describe the Instance (Wait 15-20 seconds):**
    * `~/aws/ec2/2.sh`

4.  **Connect via SSH:**
    * `~/aws/ec2/3.sh`

5.  **Get SSH/SCP Command:**
    * `~/aws/ec2/4.sh`

6.  **Check Instance State:**
    * `~/aws/ec2/5.sh`

## EC2 Auto-Shutdown

The EC2 instance should be configured with an auto-shutdown script that terminates the instance after a period of inactivity (e.g., 30 seconds of disconnect and no active user sessions). This script should be placed on the EC2 instance itself. This is not part of the termux scripts, but critical for cost savings. [See my implementation](../../aws/ec2-inactivity-shutdown/) 

## Considerations

* **Security:** Be extremely cautious with your AWS credentials, especially when working in a mobile environment. Avoid storing sensitive information in plain text. Better not to use the root account credentials. Create a new user and assign the minimal permissions or add to the Administrator Group, such that in case of a compromise situation immediately revoke the credentials and disable the user.
* **Error Handling:** The provided scripts have minimal error handling. Future releases or updates would have error checks and logging for production use.
* **Dependencies:** These scripts rely on the AWS CLI, `ssh`, `grep`, `awk`, and `sed`. Ensure these tools are available in your Termux environment.
* **Network:** Mobile network connections can be unstable. Consider using a stable Wi-Fi connection for reliable SSH access.
* **SG Ingress:** Working from a mobile data network or changing wifi spots can be tricky as the security group should permit the said public ip, for which I am using a hosted script and few scripts to remove any ip with full permission and add my public ip with full permission. For this purpose [echo my ip](../../aws/echo-my-ip/) is deployed on my aws account but do not wish to publish the same.  
* **Cost:** Be aware of AWS EC2 instance costs and ensure the auto-shutdown mechanism is functioning correctly.

* *Just a  Note*
I am working on Samsung Tab S7 FE with full keyboard book case cover and strict face recognition and is not so bothered about storing the credentials as plain text.  

## Addressing dynamic public ip and AWS security group permissons

**[aws-fw-update.sh](./aws-fw-update.sh)** 

This is a useful script for dynamically updating security group ingress rules, especially in situations where your public IP address changes frequently (like when using mobile data). Here's a breakdown of the script and some considerations:

**Script Explanation:**

1.  **`currentip=$( get my public ip service like what is my ip or host your self with my code on git https://bz2.in/7ltohs)`:**
    * This line retrieves your current public IP address. I am using own hosted service, for better control and reliability and the same code is also shared.
    * Then it retrieves the details of the specified security group and saves them to `permissions.json`.
    * Thrn  parses `permissions.json` to extract existing CIDR IP ranges (excluding `/0`, which represents all IPs).
    * It then iterates through each existing CIDR and revokes the corresponding ingress rule.
    * This is the section that removes all previous specific ip addresses.
4.  **`aws ec2 authorize-security-group-ingress --group-id $AWS_SECURITY_GROUP --protocol "-1" --cidr "$currentip/32"`:**
    * This command adds a new ingress rule to the security group, allowing all traffic (`-1`) from your current IP address (`$currentip/32`).

**Pros:**
* **Dynamic IP Handling:**
    * It effectively solves the problem of changing public IP addresses.
* **Security:**
    * By revoking existing rules before adding the new one, it minimizes the window of vulnerability.
    * By using /32 the allowed ip is only the current ip.
* **Automation:**
    * It automates a tedious and error-prone process.
* **Control:**
    * Using your own ip service gives full control.

**Cons/Considerations:**

* **Security Risks:**
    * While the script improves security compared to allowing all IPs (`/0`), it still grants broad access from your current IP. Ensure you trust the devices using that IP.
    * If your IP is compromised, the ec2 instance is also compromised.
* **Dependencies:**
    * It relies on the AWS CLI, `grep`, `awk`, and your custom IP service.
* **Error Handling:**
    * The script lacks error handling. Consider adding checks for AWS CLI errors and network connectivity.
* **Permissions:**
    * Ensure the AWS credentials have the necessary permissions to modify security group ingress rules.
* **Cost:**
    * If the hosted ip service is not in the free tier, it will incur cost.
* **Potential for service disruption:**
    * If the ip service is down, the script will also fail.

**Improvements:**

* **Error Handling:**
    * Add `if` statements to check the exit codes of AWS CLI commands.
    * Implement logging to track script execution and potential errors.
* **Input Validation:**
    * Validate the `$currentip` variable to ensure it's a valid IP address.
* **Confirmation:**
    * Add a confirmation prompt before revoking and authorizing security group rules.
* **Specific Ports:**
    * Instead of allowing all traffic (`-1`), consider specifying the necessary ports and protocols.

**Overall:**

This script is a valuable tool for managing security group ingress rules in dynamic IP environments. Remember to prioritize security and implement error handling for production use. ;) Assessment of Google Gemini
 
;) jthoma stands for Jiju Thomas Mathew, which is my full name

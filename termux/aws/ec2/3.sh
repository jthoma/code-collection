PIP=$(grep PublicIp ooo.txt | tail -1 | awk -F '"' '{print $4}')

ssh -i $AWS_SSH_ID -o "StrictHostKeyChecking no" -o "UserKnownHostsFile=/dev/null" ubuntu@$PIP -v

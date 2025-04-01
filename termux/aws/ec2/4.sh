PIP=$(grep PublicIp ooo.txt | tail -1 | awk -F '"' '{print $4}')

echo "-i $AWS_SSH_ID -o ::StrictHostKeyChecking no:: -o ::UserKnownHostsFile=/dev/null:: ubuntu@$PIP " | sed -e 's/::/"/g'

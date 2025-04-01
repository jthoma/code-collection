currentip=$( get my public ip service like what is my ip or host your self with my code on git https://bz2.in/7ltohs)
  aws ec2 describe-security-groups --group-id $AWS_SECURITY_GROUP > permissions.json
  grep CidrIp permissions.json | grep -v '/0' | awk -F'"' '{print $4}' | while read cidr;
   do
     aws ec2 revoke-security-group-ingress --group-id $AWS_SECURITY_GROUP --ip-permissions "FromPort=-1,IpProtocol=-1,IpRanges=[{CidrIp=$cidr}]"
   done   
  aws ec2 authorize-security-group-ingress --group-id $AWS_SECURITY_GROUP --protocol "-1" --cidr "$currentip/32"

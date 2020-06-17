

cwd(){
  cd $1
  if [ -f .env ] ; then
    . .env
  fi
}

sgupdate()
{
  currentip=$(<get current IP>)
  if [ -f `pwd`/.current.ip ] ; then
    lastip=$(cat `pwd`/.current.ip)
    if [ "$lastip" != "$currentip" ] ; then 
      /usr/local/bin/aws ec2 revoke-security-group-ingress --group-id $AWS_SECURITY_GROUP --protocol "-1" --cidr "$lastip/32"
      /usr/local/bin/aws ec2 authorize-security-group-ingress --group-id $AWS_SECURITY_GROUP --protocol "-1" --cidr "$currentip/32"
      echo -n "$currentip" > `pwd`/.current.ip
    fi
  else
    /usr/local/bin/aws ec2 authorize-security-group-ingress --group-id $AWS_SECURITY_GROUP --protocol "-1" --cidr "$currentip/32"
    echo -n "$currentip" > `pwd`/.current.ip
  fi
}


alias cd='cwd'
alias aws-permit-me='sgupdate'
alias scpns='scp -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -o IdentitiesOnly=yes'
alias sshns='ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" -o IdentitiesOnly=yes'


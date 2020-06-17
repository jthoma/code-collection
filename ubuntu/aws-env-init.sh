#!/bin/bash

ENVFILE="`pwd`/.env"

if [ -f $ENVFILE ] ; then
   . $ENVFILE  
fi

set -e

read -e -i "$AWS_ACCESS_KEY_ID" -p "AccessKeyId : " AccessKeyId
read -e -i "$AWS_SECRET_ACCESS_KEY" -p "SecretAccessKey : " SecretAccessKey
read -e -i "$AWS_DEFAULT_REGION" -p "DefaultRegion : " DefaultRegion
read -e -i "$AWS_SECURITY_GROUP" -p "SecurityGroupId : " SecurityGroupId

echo "export AWS_DEFAULT_REGION=$DefaultRegion" > $ENVFILE
echo "export AWS_ACCESS_KEY_ID=$AccessKeyId" >> $ENVFILE 
echo "export AWS_SECRET_ACCESS_KEY=$SecretAccessKey" >> $ENVFILE 
echo "export AWS_SECURITY_GROUP=$SecurityGroupId" >> $ENVFILE

. $ENVFILE 


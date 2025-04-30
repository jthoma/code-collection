#!/bin/bash
set -e

FULL_URL="$1"
SHORT_ID="$2"

if [ -z "$FULL_URL" ]; then
  echo "Error: Full URL is required."
  exit 1
fi

#will need this later
long_id=$(echo "$FULL_URL" | md5sum | awk '{print $1}')

if [ -z "$SHORT_ID" ]; then
  # Implement logic to generate a unique short ID
  SHORT_ID=$(echo "$long_id" | cut -c1-8)
fi

source .config

S3_KEY="$SHORT_ID"
S3_URI="s3://${BUCKET_NAME}/$S3_KEY"

#check if url is already shortened by us
ISDONE=$(aws s3 ls $BUCKET_NAME/$long_id | wc -l)
if [ "$ISDONE" -eq 1 ]; then
aws s3 cp $BUCKET_NAME/$long_id  $TMPDIR/shortid.txt
theid=$(cat $TMPDIR/shortid.txt)
rm $TMPDIR/shortid.txt
echo "Redirection already done please use: $SHORT_PREFIX/$theid"
exit 0
fi

#must check if the key is already used
INUSE=$(aws s3 ls $S3_URI | wc -l)

if [ "$INUSE" -ne 0 ]; then
  echo "ShortID $SHORT_ID is used exiting"
  exit 1;
fi

echo -n "" > $TMPDIR/dummy.txt

echo "Creating short URL: $SHORT_PREFIX/$SHORT_ID -> $FULL_URL"
aws s3 cp $TMPDIR/dummy.txt $S3_URI 
aws s3api put-object \
    --bucket $BUCKET_NAME \
    --key $SHORT_ID \
    --website-redirect-location "$FULL_URL"

#Will confirm  that those things have happened 
aws s3api head-object \
     --bucket $BUCKET_NAME \
     --key $SHORT_ID > $TMPDIR/head.txt
URLC=$( grep 'Location' $TMPDIR/head.txt | grep -c "$FULL_URL" )

if [ "$URLC" -eq 1 ]; then
  rm $TMPDIR/head.txt
  curl -I $SHORT_PREFIX/$SHORT_ID > $TMPDIR/head.txt

  URLC=$( grep 'location:' $TMPDIR/head.txt | grep -c "$FULL_URL" )

fi

if [ "$URLC" -eq 1 ]; then

#now that we created the short url update the long_id also
echo -n "$SHORT_ID" > $TMPDIR/shortid.txt
aws s3 cp $TMPDIR/shortid.txt s3://$BUCKET_NAME/$long_id

fi

rm $TMPDIR/dummy.txt
rm $TMPDIR/shortid.txt

echo "Short URL created successfully: $SHORT_PREFIX/$SHORT_ID"

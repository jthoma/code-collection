#!/bin/bash

. $(dirname "$0")/cfg.sh



aws dynamodb list-tables --output text | awk '{print $2}' > LISTFILE

cat LISTFILE | while read tbl 
    do 
        aws dynamodb describe-table --table-name $tbl --output json > cfg_${tbl}.json
        node rewrite.js $tbl     
    done
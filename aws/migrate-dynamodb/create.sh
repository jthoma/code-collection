#!/bin/bash

. $(dirname "$0")/cfg.sh


cat LISTFILE | while read tbl 
    do 
        aws dynamodb create-table --cli-input-json file://create_{$bl}.json
    done
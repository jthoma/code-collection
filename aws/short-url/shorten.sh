#!/bin/bash

if [ "$#" -eq "1" ] ; then
/usr/bin/curl \
	-H "Content-Type: application/json" \
	-H "x-api-key:<API-KEY>" \
	-d '{"url":"'$1'"}' \
	"<API_GATEWAY_ENDPOINT>"
fi


if [ "$#" -eq "2" ] ; then
/usr/bin/curl \
	-H "Content-Type: application/json" \
	-H "x-api-key:<API-KEY>" \
	-d '{"url":"'$1'","id_short":"'$2'"}' \
	"<API_GATEWAY_ENDPOINT>"
fi


echo ""



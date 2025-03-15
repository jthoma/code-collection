#!/bin/bash
LOGTIME=$(date)
LOG_FILE="/var/log/autostop.log"
MIN_DELAY=150 # delay to kick autostop in seconds since startup

CURRTS=$(date +%s)
BOOTTS=$(date +%s -d "$(uptime -s)")

UTSEC=$(( $CURRTS - $BOOTTS ))

if [ $UTSEC -lt $MIN_DELAY ] ; then
  echo "[$LOGTIME] uptime $UTSEC is less than $MIN_DELAY skipping shutdown check " >> $LOG_FILE
  exit 0
fi

if [ -f /root/longrun ] ; then
 echo "[$LOGTIME] longrun exists skipping shutdown" >> $LOG_FILE 
 exit 0
fi

/root/autostop.sh >> $LOG_FILE 2>&1 &

sleep 30

/root/autostop.sh >> $LOG_FILE 2>&1 &

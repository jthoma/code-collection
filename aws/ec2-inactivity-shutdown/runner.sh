#!/bin/bash
LOG_FILE="/var/log/autostop.log"
if [ -f /root/longrun ] ; then
 echo "[$(date)] longrun exists skipping shutdown" >> $LOG_FILE 
 exit
fi

/root/autostop.sh >> $LOG_FILE 2>&1 &

sleep 30

/root/autostop.sh >> $LOG_FILE 2>&1 &

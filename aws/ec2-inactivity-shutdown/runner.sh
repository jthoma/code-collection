#!/bin/bash

if [ -f /root/longrun ] ; then
 exit
fi


/root/autostop.sh >> /var/log/autostop.log 2>&1 &

sleep 30

/root/autostop.sh >> /var/log/autostop.log 2>&1 &

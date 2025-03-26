#!/bin/bash

LOG_FILE="/var/log/autostop.log"
TIMEOUT=29
CHECKFOR="ubuntu"

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

USERS=$( /usr/bin/w | grep -c "$CHECKFOR" )

if [ $USERS -gt 0 ] ; then
    echo "$TIMESTAMP: User logged in, skipping shutdown" >> "$LOG_FILE"
    exit 0
fi

AUTHIP=$(grep "Accepted publickey for $CHECKFOR" /var/log/auth.log | tail -1 | awk '{print $9}')

if [ -z "$AUTHIP" ]; then
    echo "$TIMESTAMP: Login from IP not found, exiting" >> "$LOG_FILE"
    exit 0
fi
AUTHDT=$(grep "Accepted publickey for $CHECKFOR" /var/log/auth.log | tail -1 | awk '{print $1}')

if [ -z "$AUTHDT" ]; then
    echo "$TIMESTAMP: Login from IP not found, exiting" >> "$LOG_FILE"
    exit 0
fi

DISCDT=$(grep "Received disconnect from $AUTHIP" /var/log/auth.log | tail -1 | awk '{print $1}')

if [ -z "$DISCDT" ]; then
    echo "$TIMESTAMP: Disconnect not found, exiting" >> "$LOG_FILE"
    exit 0
fi


AUTH_TS=$(date -d "$AUTHDT" +%s)
DISC_TS=$(date -d "$DISCDT" +%s)
CURR_TS=$(date +%s)

    echo "$TIMESTAMP: Current timestamp: $CURR_TS Disconnected Timestamp: $DISC_TS " >> "$LOG_FILE"

if [$AUTH_TS -gt $DISC_TS ] ; then
    echo "$TIMESTAMP: Disconnect at $DISCDT is before Authentication at $AUTHDT, exiting  " >> "$LOG_FILE"
    exit 0
fi

TSDIFF=$(($CURR_TS - $DISC_TS))

if [ $TSDIFF -gt $TIMEOUT ]; then
    echo "$TIMESTAMP: Inactivity timeout reached, shutting down" >> "$LOG_FILE"
    /usr/sbin/shutdown -h now
else
    echo "$TIMESTAMP: Inactivity timeout not reached, exiting" >> "$LOG_FILE"
fi

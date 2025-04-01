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

AUTH_LOG_LINE=$(grep "Accepted publickey for $CHECKFOR" /var/log/auth.log | tail -1)

if [ -z "$AUTH_LOG_LINE" ]; then
    echo "$TIMESTAMP: Login not found, exiting" >> "$LOG_FILE"
    exit 0
fi

AUTHDT=$(echo "$AUTH_LOG_LINE" | awk '{print $1}')
AUTHIP=$(echo "$AUTH_LOG_LINE" | awk '{print $9}')

if [ -z "$AUTHDT" ]; then
    echo "$TIMESTAMP: Login not found, exiting" >> "$LOG_FILE"
    exit 0
fi

if [ -z "$AUTHIP" ]; then
    echo "$TIMESTAMP: Login IP not found, exiting" >> "$LOG_FILE"
    exit 0
fi

DISCDT=$(grep "Received disconnect from $AUTHIP" /var/log/auth.log | tail -1 | awk '{print $1}')

if [ -z "$DISCDT" ]; then
    echo "$TIMESTAMP: Disconnect not found, exiting" >> "$LOG_FILE"
    exit 0
fi

    echo "$TIMESTAMP: Got Data: $AUTHIP $AUTHDT $DISCDT; Continue" >> "$LOG_FILE"

AUTH_TS=$(date -d "$AUTHDT" +%s)
DISC_TS=$(date -d "$DISCDT" +%s)
CURR_TS=$(date +%s)

echo "$TIMESTAMP: Logout at $DISC_TS and Current Time: $CURR_TS" >> "$LOG_FILE"

TSDIFF=$(( $CURR_TS - $DISC_TS ))

if [ $TSDIFF -gt $TIMEOUT ]; then
    echo "$TIMESTAMP: Inactivity timeout reached ( $TSDIFF / $TIMEOUT ), shutting down" >> "$LOG_FILE"
    /usr/sbin/shutdown -h now
else
    echo "$TIMESTAMP: Inactivity timeout not reached, exiting ( $TSDIFF / $TIMEOUT )" >> "$LOG_FILE"
fi

# AWS EC2 Inactivity Shutdown

This actually originated from muy own requirement where I mostly work on Samsung Tab S7 FE using Keyboard cover and termux installed. Simple actions like splitting dash cam videos into frames for google map share can be done with ffmpeg and imagemgagic whereas more critical functions related to deployment of serverless functions and for other official work I keep an EC2 ubuntu instance and starts whenever I need it. Sometimes due to inactivity or network issues or even I may forget to shutdown the instance after use incurring runtime costs. 

These scripts were from my Idea and it works. Since I never like long running scripts and linux cron doesnot have a second based granularity, the runner.sh should be run once every minute. I configured as root and the primary user is ubuntu. You can change if needed. Read the script and make sure you understand what is written. It works for me.

The runner.sh checks for a file "/root/logrun" and if it exists skips shutdown check. Time to time I may shift from tab to laptop and some scripts may be running in the background and I may take some time to be back to the desk. Then I just do " date > /root/logrun " and when I get back remove that file. 

This version has a few extra logging and an optimization from previous version line 16 and 17 were running the same grep on auth.log whereas now the logline is first captured and awk is running on the captured variable expecting a performance increase which can be evaluated only after few days of run.
;) jthoma stands for Jiju Thomas Mathew, which is my full name

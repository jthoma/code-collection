# AWS EC2 Inactivity Shutdown

This actually originated from muy own requirement where I mostly work on Samsung Tab S7 FE using Keyboard cover and termux installed. Simple actions like splitting dash cam videos into frames for google map share can be done with ffmpeg and imagemgagic whereas more critical functions related to deployment of serverless functions and for other official work I keep an EC2 ubuntu instance and starts whenever I need it. Sometimes due to inactivity or network issues or even I may forget to shutdown the instance after use incurring runtime costs. These scripts were from my Idea and it works. Since I never like long running scripts and linux cron doesnot have a second based granularity, the runner.sh should be run once every minute. I configured as root and the primary user is ubuntu. You can change if needed. Read the script and make sure you understand what is written. It works for me.



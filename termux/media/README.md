## My contributions to developers working in Android and Termux
There are more above this directory

# tsv.sh - timestamping those videos from different capture devices

just pass the video file as argument which has the android format of file naming convention with the filename part before '_' as the starting timestamp.
note that this is designed for youtube shorts or facebook reels and essentially will handle only second increments and will fail if the higher derivatives has to change in the video. 
Update on June 24 2025 has enabled longer videos to be timestamped 
The image magick gravity positions the timestamp and this if you want to change try different values
* north is top center and east west south and combinations can be used
* the +0+8 option in annotate will create a margin inside the annotation in pixels the values are +(x)+(y)

#stv.sh - make a landscape hd video from potrait video

Portrait HD or 3:4 or 1:1 any dimension video will be converted to landscape 1080x1960.
I agree that ffmpeg with its crop and resize filters can achieve this but will be processing the video in large chunks and might exhaust mobile capacities. crop and resize is happening only on frames one by one and the processing is efficient. One another aspect is that when using ffmpeg, we should do the calculations and identify the size and offset, whereas this script will take care of those automatically. Only that we should be careful not to provide landscape videos.
There could be distortion when resizing but this script will handle all calculations to
efficiently choose the dimensions accordingly. And is tested on Android in Samsung
Galaxy M14, A54 and Tab S7 FE

* script takes two parameters the video to process and crop location. supported values for this are one of
- North -- top
- West  -- left center 
- East  -- right center
- South -- bottom
- Center

Note that these anchors West or East will be same as the full width is assumed to be there in the final output

 
;) jthoma stands for Jiju Thomas Mathew, which is my full name

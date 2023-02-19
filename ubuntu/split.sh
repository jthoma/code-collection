#!/bin/bash


wlimit=8000000
file=$1

 filesize=$(stat $file -c %s)


cx=$( echo " $filesize / $wlimit " | bc)


rm -f /tmp/info.txt
ffmpeg -i $file  > /tmp/info.txt 2>&1

dur=$(grep "Duration: " /tmp/info.txt | tr "," " " | sed -e 's/Duration: //' | sed -e 's/ start: //' | sed -e 's/ bitrate: //'| awk '{print $1}')
#echo "$dur > $cx" 

lenh=$(echo "$dur"| awk -F: '{print $1}')
lenm=$(echo "$dur"| awk -F: '{print $2}')
lens=$(echo "$dur"| awk -F: '{print $3}')

#echo " $lenh $lenm $lens"


tlen=$( echo "( $lenh * 60 * 60 ) + ( $lenm * 60 ) + $lens " | bc )

echo " $tlen/$cx "
exit 0;

tmx=$( echo " $tlen/$cx " | bc)
echo "$file has total duration $dur and can split into $cx parts each of duration $( date -d@$tmx -u +%H:%M:%S )"

echo "";

> /dev/shm/run.txt 

seq 1 $cx | while read n

    do 
        st=$( echo " ($n - 1 ) * $tmx " | bc  )
        et=$( echo "$st + $tmx" | bc  )
        nf=$( echo $file | sed -e "s/\.mp4/\-$n.mp4/")

       echo "sleep 2; ffmpeg -ss $( date -d@$st -u +%H:%M:%S ) -to $( date -d@$et -u +%H:%M:%S ) -i $file -acodec copy -vcodec copy -async 1 $nf ;" >> /dev/shm/run.txt  
        
    done

    /bin/bash /dev/shm/run.txt 


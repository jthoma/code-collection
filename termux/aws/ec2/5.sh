grep -A3  '"State"' ooo.txt | grep "Name" | awk -F '"' '{print $4}'

<?php

$ng = range(1, 70);
$pg = range(1, 20);

$slno = 0; 

$ngr = array_reverse($ng, false);

function mkftg(){

    global $slno;
    $slno++;

    return str_pad(str_replace('.', '', $slno), 5 , '0', STR_PAD_LEFT);

}

function mkcmd( $exp, $plmin) {

    $iter = range(0, 9);

    if($plmin == '-'){
        $iter = array_reverse($iter);
    }
    foreach ($iter as $j){
        $ftg = mkftg();
        $expos = $exp + ($j / 10);
        echo "img" . $ftg . ".png " .$plmin."$expos"."\n";
    }

}


foreach($ngr as $exp){
    mkcmd( $exp, '-');
}

foreach($pg as $exp){
    mkcmd( $exp, '+');
}

/*
  
php -q generator.php > newlist.txt
cat newlist.txt | while read fname val ; do echo $fname; convert src.png -brightness-contrast ${val}x0 anim/$fname; done
*/

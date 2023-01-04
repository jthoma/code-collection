<?php

/**
 * @package "{}"
 * @
 * @author Jiju Thomas Mathew
 */
require(dirname(__FILE__)."/gds/XmlSelect.php");

function terminalFormat(&$line, $index){
    if(strlen($line) > 64){
        $line = chunk_split($line, 64, "\n");
    }
}

class gdsInterface
{
    public static function getSession($key){
        $sessionPath = getenv("HOME")."/.gterm/$key";
        $rv = false;
        if(file_exists($sessionPath)){
            $rv = unserialize(file_get_contents($sessionPath));
        }
        return $rv;
    }
    public static function setSession($key, $val){
        $sessionPath = getenv("HOME")."/.gterm/$key";
        if(!is_dir(dirname($sessionPath))){
            mkdir(dirname($sessionPath), 0700, true);
        }
        file_put_contents($sessionPath, serialize($val));
    }
    public static function beginSession(&$client, &$config){
        $bs = new BeginSession();
        $bs->Profile = $config['hapcode'];
        try{
            $resp = $client->BeginSession($bs);
            if(!empty($resp->BeginSessionResult)){
                $config['XmlSelectSessionToken'] = $resp->BeginSessionResult;
                unset($config['intermediate']);
                return $resp->BeginSessionResult;
            }
        }catch(Exception $e){
        }
        return false;
    }
    public static function endSession(&$client, &$config){
        if(!empty($config['XmlSelectSessionToken'])){
            $es = new EndSession();
            $es->Token = $config['XmlSelectSessionToken'];
            $client->EndSession($es);
            unset($config['XmlSelectSessionToken']);
        }
        gdsInterface::colorEnd();
        echo "bye\n";
        exit();
    }
    public static function sendCmd(&$client, &$config, $command){
        if(!empty($config['XmlSelectSessionToken'])){
            $titleNow = $config['terminaltitle'];
            gdsInterface::setTitle("Contacting Gateway"); 
            $tt = new SubmitTerminalTransaction();
            $tt->Token = $config['XmlSelectSessionToken'];
            $tt->Request = strtoupper($command);
            if(!empty($config['intermediate'])){
                $tt->IntermediateResponse = $config['intermediate'];
            }
            $resp = $client->SubmitTerminalTransaction($tt);
            $respStr = $resp->SubmitTerminalTransactionResult;
	    if(!isset($config['intermediate'])){
		$config['intermediate'] = '';
	    }
            $config['intermediate'] .= $respStr;
        
            if(strpos($respStr,"\n") === false)
                $respStr = chunk_split($respStr, 64, "\n");

            $aResp = explode("\n", $respStr);
            array_walk($aResp, 'terminalFormat');
            if((strlen($command) == 7 && substr($command, 0, 1) == '*') or (strpos($aResp[0], 'NEUTRAL DISPLAY') === 0)){
                echo "\033[42;30m ".str_pad(array_shift($aResp),63)."\033[0m\r\n";
            }
            gdsInterface::colorStart();
            echo join("\n", $aResp);
            gdsInterface::colorEnd();
            gdsInterface::setTitle($titleNow); 
        }
    }
    public static function colorStart(){
        echo "\033[32;1m";
    }
    public static function colorEnd(){
        echo "\033[0m";
    }
    public static function setTitle($msg){
        global $config;
        $config['terminaltitle'] = $msg;
        echo "\033]2;gterm - $msg\007";
    }
} 

$config = false;
$client = false;
$justStarted = true;
print chr(27)."[H".chr(27)."[2J";
gdsInterface::setTitle("Not Authenticated"); 
while(true){
   if($justStarted === true){
    $cmd = "sin";
    $justStarted = false;
   }else{
    gdsInterface::colorStart();
    $cmd = readline("> ");
    gdsInterface::colorEnd();
    readline_add_history($cmd);
   }
    switch(strtolower($cmd)){
        case "quit":
        case "exit":
            break 2;
        break;  
        case "sin":
            gdsInterface::setTitle("Authenticating"); 
            gdsInterface::colorStart();
            $hap = readline("HAP: ");
            if(($config = gdsInterface::getSession($hap)) !== false){
               $useConfig = readline("Use saved credentials (Y/n) ? ");
               if(strtolower($useConfig) == 'n'){
                    $config = false;
               }
            }
            if(!$config){
                $login = readline("UserName: ");
                $command = "/usr/bin/env bash -c 'read -s -p \"Password: \" mypassword && echo \$mypassword'";  
                $password = rtrim(shell_exec($command));  
                $config = array('hapcode' => $hap, 'username' => $login, 'password' => $password);
                echo "\n";
                gdsInterface::setSession($hap, $config);
            }
            gdsInterface::colorEnd();

            $wsdl = (strpos($config['hapcode'], 'Copy'))?'gds/XMLSelectCopy.wsdl':'gds/XMLSelect.wsdl';
            $client = new XmlSelect(dirname(__FILE__).'/'.$wsdl);
            $client->setCredentials($config['username'], $config['password']);
            $auth = gdsInterface::beginSession($client, $config);
            if($auth === false){
                $config = false;
                $client = false;
                echo "\033[31;1mLogin failed\033[0m\r\n"; 
                gdsInterface::setTitle("Not Authenticated"); 
            }else{
                gdsInterface::setTitle( "Identified with ".$hap );
            }
        break;
        case 'sof':
            gdsInterface::endSession($client, $config);
        break;
        default:
            if(!$config){
                echo "\033[31;1mLogin first\033[0m\r\n"; 
            }else{
                gdsInterface::sendCmd($client, $config, $cmd);
		if(!empty($cmd) && strtolower($cmd{0}) == 'e'){
			$config['intermediate'] = '';
		}
            }
        break;
    }
}

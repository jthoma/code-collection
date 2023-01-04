<?php
class SubmitXml {
  public $Profile; // string
  public $Request; // Request
  public $Filter; // Filter
}

class Request {
  public $any; // <anyXML>
}

class Filter {
  public $any; // <anyXML>
}

class SubmitXmlResponse {
  public $SubmitXmlResult; // SubmitXmlResult
}

class SubmitXmlResult {
  public $any; // <anyXML>
}

class MultiSubmitXml {
  public $Profile; // string
  public $Requests; // Requests
}

class Requests {
  public $any; // <anyXML>
}

class MultiSubmitXmlResponse {
  public $Responses; // Responses
}

class Responses {
  public $any; // <anyXML>
}

class BeginSession {
  public $Profile; // string
}

class BeginSessionResponse {
  public $BeginSessionResult; // string
}

class EndSession {
  public $Token; // string
}

class EndSessionResponse {
}

class SubmitXmlOnSession {
  public $Token; // string
  public $Request; // Request
  public $Filter; // Filter
}

class SubmitXmlOnSessionResponse {
  public $SubmitXmlOnSessionResult; // SubmitXmlOnSessionResult
}

class SubmitXmlOnSessionResult {
  public $any; // <anyXML>
}

class SubmitTerminalTransaction {
  public $Token; // string
  public $Request; // string
  public $IntermediateResponse; // string
}

class SubmitTerminalTransactionResponse {
  public $SubmitTerminalTransactionResult; // string
}

class GetIdentityInfo {
  public $Profile; // string
}

class GetIdentityInfoResponse {
  public $GetIdentityInfoResult; // GetIdentityInfoResult
}

class GetIdentityInfoResult {
  public $any; // <anyXML>
}

class SubmitCruiseTransaction {
  public $Profile; // string
  public $CorrelationToken; // string
  public $Transactions; // Transactions
}

class Transactions {
  public $any; // <anyXML>
}

class SubmitCruiseTransactionResponse {
  public $Response; // Response
  public $CorrelationToken; // string
}

class Response {
  public $any; // <anyXML>
}


/**
 * XmlSelect class
 * 
 * Allows access to XML Select services over SOAP. 
 * 
 * @author    {author}
 * @copyright {copyright}
 * @package   {package}
 */
class XmlSelect extends SoapClient {

    private $userpass;
    public $debugLevel;
    public $debug_str;

    private static $classmap = array(
        'SubmitXml' => 'SubmitXml',
        'Request' => 'Request',
        'Filter' => 'Filter',
        'SubmitXmlResponse' => 'SubmitXmlResponse',
        'SubmitXmlResult' => 'SubmitXmlResult',
        'MultiSubmitXml' => 'MultiSubmitXml',
        'Requests' => 'Requests',
        'MultiSubmitXmlResponse' => 'MultiSubmitXmlResponse',
        'Responses' => 'Responses',
        'BeginSession' => 'BeginSession',
        'BeginSessionResponse' => 'BeginSessionResponse',
        'EndSession' => 'EndSession',
        'EndSessionResponse' => 'EndSessionResponse',
        'SubmitXmlOnSession' => 'SubmitXmlOnSession',
        'Request' => 'Request',
        'Filter' => 'Filter',
        'SubmitXmlOnSessionResponse' => 'SubmitXmlOnSessionResponse',
        'SubmitXmlOnSessionResult' => 'SubmitXmlOnSessionResult',
        'SubmitTerminalTransaction' => 'SubmitTerminalTransaction',
        'SubmitTerminalTransactionResponse' => 'SubmitTerminalTransactionResponse',
        'GetIdentityInfo' => 'GetIdentityInfo',
        'GetIdentityInfoResponse' => 'GetIdentityInfoResponse',
        'GetIdentityInfoResult' => 'GetIdentityInfoResult',
        'SubmitCruiseTransaction' => 'SubmitCruiseTransaction',
        'Transactions' => 'Transactions',
        'SubmitCruiseTransactionResponse' => 'SubmitCruiseTransactionResponse',
        'Response' => 'Response',
       );

   /**
    * Call a url using cli curl and external file
    *
    * @param string $url
    * @param string $data
    * @return string
    */
  protected function callCurl($url, $xml, $action) {
       // should use --interface eth0:1-5 in random if from server..
       $tmpFile = tempnam('/dev/shm', 'curlreq_');
       file_put_contents($tmpFile, gzencode($xml));
       $cmd = '/usr/bin/curl -s --basic -u "'.$this->userpass.'" '
            .'-A "Reserway Client 2.0 [PHP 5.2]; http://www.reserway.com" '
            .'-H "Content-Type: text/xml; charset=utf-8" '
            .'-H "Content-encoding: gzip" '
            .'-H \'SOAPAction: "'.$action.'"\' '
            .'--data-binary @'.$tmpFile.' --compressed "'.$url.'"';
       $data = array();
       $this->debug("Request Xml" . $xml);
       exec($cmd, $data, $fault);
       $response = join("\n",$data);
       $this->debug("Curl Response: " . $response);
       return $response;
  }

  private function debug($msg, $mlevel = 1){
        if($this->debugLevel >= $mlevel){
            $this->debug_str .= microtime(1) . ': ' . $msg . "\n";
        }
  }

  public function setCredentials($login, $pass){
        $this->userpass = $login . ':' . $pass;
  }

  public function __doRequest($request,$location,$action,$version,$one_way = 0) {
       return $this->callCurl($location,$request,$action);
  }

  public function XmlSelect($wsdl = "gds/XMLSelect.wsdl", $options = array()) {
    $options = array_merge($options, array('trace' => true, 'compression' => SOAP_COMPRESSION_ACCEPT | SOAP_COMPRESSION_GZIP));
    foreach(self::$classmap as $key => $value) {
      if(!isset($options['classmap'][$key])) {
        $options['classmap'][$key] = $value;
      }
    }
    $this->debugLevel = 10;
    parent::__construct($wsdl, $options);
  }

  /**
   * Submits an XML request in a sessionless environment. 
   *
   * @param SubmitXml $parameters
   * @return SubmitXmlResponse
   */
  public function SubmitXml(SubmitXml $parameters) {
    return $this->__soapCall('SubmitXml', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Allows users to send multiple sessionless Structured Data transactions within a single 
   * web service call.  The following restrictions apply:<ul><li>It will not respond until 
   * all of the transactions respond.  This means the caller must wait for the slowest transaction 
   * to return before getting results to any of the transactions.</li><li>It can only be used 
   * for unrelated transactions.  All transactions may (or may not) be sent simultaneously, 
   * and there is no particular order expressed nor implied.</li><li>Terminal transactions 
   * are not supported.</li><li>Sessioned transactions are not supported.</li></ul> 
   *
   * @param MultiSubmitXml $parameters
   * @return MultiSubmitXmlResponse
   */
  public function MultiSubmitXml(MultiSubmitXml $parameters) {
    return $this->__soapCall('MultiSubmitXml', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Begins an XML Select session.
If this method returns a valid (non-empty) session token, 
   * the session must be released with EndSession. 
   *
   * @param BeginSession $parameters
   * @return BeginSessionResponse
   */
  public function BeginSession(BeginSession $parameters) {
    return $this->__soapCall('BeginSession', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Ends an XML Select session. 
   *
   * @param EndSession $parameters
   * @return EndSessionResponse
   */
  public function EndSession(EndSession $parameters) {
    return $this->__soapCall('EndSession', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Submits an XML Request on the specified session. 
   *
   * @param SubmitXmlOnSession $parameters
   * @return SubmitXmlOnSessionResponse
   */
  public function SubmitXmlOnSession(SubmitXmlOnSession $parameters) {
    return $this->__soapCall('SubmitXmlOnSession', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Submits a terminal transaction on a session and returns the result. 
   *
   * @param SubmitTerminalTransaction $parameters
   * @return SubmitTerminalTransactionResponse
   */
  public function SubmitTerminalTransaction(SubmitTerminalTransaction $parameters) {
    return $this->__soapCall('SubmitTerminalTransaction', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Retrieves the Identity information for the specified profile 
   *
   * @param GetIdentityInfo $parameters
   * @return GetIdentityInfoResponse
   */
  public function GetIdentityInfo(GetIdentityInfo $parameters) {
    return $this->__soapCall('GetIdentityInfo', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

  /**
   * Allows callers to submit Cruise transactions to the service 
   *
   * @param SubmitCruiseTransaction $parameters
   * @return SubmitCruiseTransactionResponse
   */
  public function SubmitCruiseTransaction(SubmitCruiseTransaction $parameters) {
    return $this->__soapCall('SubmitCruiseTransaction', array($parameters),       array(
            'uri' => 'http://webservices.galileo.com',
            'soapaction' => ''
           )
      );
  }

}

?>

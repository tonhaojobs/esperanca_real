<?php
	
	/**
	 *
	 * Classe utilizada para efetuar a passagem do
	 *
	 */
	class HttpRequest {
		
		private static $header;
		private static $body;
		private static $uri;
		private static $method;
		private static $params;
		private static $assocParams;
		private static $action;
		private static $token;
		private static $validNumberParams;
		
		public static function getHeaders(){
			return self::$header;
		}
		
		public static function getHeader($key){
			return self::$header[$key];
		}
		
		public static function setHeader($header){
			self::$header = $header;
		}
		
		public static function getBody(){
			return self::$body;
		}
		
		public static function setBody($body){
			self::$body = $body;
		}
		
		public static function getUris() {
			return self::$uri;
		}
		
		public static function getUri($index) {
			return self::$uri[$index];
		}
		
		public static function setUri($uri) {
			$uri_ = explode("/", $uri);
			self::$uri = array();
			
			for($index = 0; $index < count($uri_); $index++) {
				if($uri_[$index] !== AppConstants::ROOT_APPLICATION 
				&& $uri_[$index] !== AppConstants::PATH_APPLICATION 
				&& $uri_[$index] !== AppConstants::APPLICATION_CONTEXT 
				&& $uri_[$index] !== '') {
					array_push(self::$uri, $uri_[$index]);
				}
			}
			self::$action = self::$uri[1];
		} 		
		
		public static function getMethod() {
			return self::$method;
		}
		
		public static function setMethod($method) {
			self::$method = $method;
		} 
		
		public static function getParam($index) {
			return self::$params[$index];
		}
		
		public static function getParams() {
			return self::$params;
		}
		
		public static function setParams($paramsName) {
			
			//confere se o número de parametros passados é igual ap número esperado.
			if(count($paramsName) === count(self::$uri)) {
				self::$validNumberParams = true;
				self::$params = array();
				$pattern = '/[{]{1}[a-zA-Z0-9]+[}]{1}/';
				
				if(isset(self::$uri) && count(self::$uri) > 0) {
					
					if(count(self::$uri) > 2) {
						
						for($index = 2; $index < count(self::$uri); $index++) {
							if($paramsName[$index] !== '' && preg_match($pattern, $paramsName[$index], $paramNames)) {
								
								$key = str_replace("{", "", str_replace("}", "", $paramsName[$index]));
								self::$params[$key] = self::$uri[$index];
							}
						}
					}
				}
				
			} else {
				self::$validNumberParams = false;
			}
		}
		
		public static function getAction() {
			return self::$action;
		}
		
		public static function getToken() {
			return self::$token;
		}
		
		public static function setToken($token) {
			self::$token = $token;
		}
		
		public static function isValidNumberParams() {
			return self::$validNumberParams;
		}
		
		public static function setValidNumberParams($validNumberParams) {
			self::$validNumberParams = $validNumberParams;
		}
	}
	
<?php

	class HttpResponse {
		
		private static $statusCode;
		private static $message;
		private static $data;
		private static $response_;
		
		public static function response($statusCode_, $message_, $data_) {
			
			$contentType_ = HttpRequest::getHeader('Content-Type');
			
			switch($contentType_) {
				
				case AppConstants::RESPONSE_JSON : {
					self::$response_ = json_encode(array('status' => $statusCode_, 'message' => $message_, 'data' => $data_));
					break;
				}
				
				case AppConstants::RESPONSE_HTML : {
					self::$response_ = array('status' => $statusCode_, 'message' => $message_, 'data' => $data_);
					break;
				}
				
				default : {
					self::$response_ = array('status' => $statusCode_, 'message' => $message_, 'data' => $data_);
					break;
				}
			}
			
			return self::$response_;
		}
		
		public static function getStatusCode() {
			return self::$statusCode;
		}
		
		public static function setStatusCode($statusCode) {
			self::$statusCode = $statusCode;
		}
		
		public static function getMessage() {
			return self::$message;
		}
		
		public static function setMessage($message) {
			self::$message = $message;
		}
		
		public static function getData() {
			return self::$data;
		}
		
		public static function setData($data) {
			self::$data = $data;
		}
	}	
?>

<?php

	class HTTP {
		
		protected $uri;
		protected $method;
		protected $header;
		protected $body;
		
		protected $controller;
		protected $action;
		
		protected $params;
		protected $response;
		
        public function __construct($method, $uri, $header, $body) {
			
			$this->method = $method;
			$this->setUri($uri);			
			$this->header = $header;
			$this->body = $body;
		}
		
		protected function getHeader($key){
			return $this->header[$key];
		}
		
		public function getUri($index) {
			return $this->uri[$index];
		}
		
		protected function setUri($uri) {
			//	echo $uri;
			$uri_ = explode("/", $uri);
			$this->uri = array();
			
			for($index = 0; $index < count($uri_); $index++) {
				if($uri_[$index] !== AppConstants::ROOT_APPLICATION 
				&& $uri_[$index] !== AppConstants::PATH_APPLICATION 
				&& $uri_[$index] !== AppConstants::APPLICATION_CONTEXT 
				&& trim($uri_[$index]) !== '') {
					array_push($this->uri, $uri_[$index]);
				}
			}
		} 	

		protected function getParam($index) {
			return $this->params[$index];
		}
		
		protected function getParams() {
			return $this->params;
		}
		
		/**
		 * Associa os parâmetros passados através da URL aos parâmetros
		 * esperados pela função anotada no controller, caso haja divegência
		 * entre a quantidade de argumentos passados e a quantidade de parâmetros
		 * esperados a função retorna uma mensagem de erro.
		 *
		 * @access protected
		 * @param $params
		 * @return void???
		 */
		 
		protected function _setParams($params) {
			
			$this->params = array();
			// Padrão de 
			$pattern = '/[{]{1}[a-zA-Z0-9]+[}]{1}/';
			
			if($params[1] === $this->getUri(1)) {
				
				// Valida a igualdade entre a quantidade de argumentos passados
				// e o número de parâmetros aguardados.
				if(count($this->uri) === count($params)) {
					
					if($params[1] === $this->getUri(1)) {
						if(count($params) > 2) {
							
							for($index = 2; $index < count($params); $index++) {
								
								$result = preg_match($pattern, $params[$index]);
				
								if($result === 1) {
									$key = str_replace("{", "", str_replace("}", "", $params[$index]));
									$this->params[$key] = $this->uri[$index];
								}
							}
						}
					} else {
						//
					}
				} else {
					// retorna erro na quantidade de parâmetros passados
				}
			} else {
				// retorna erro 404
			}		
		}
		
		protected function setController($controller) {
			$this->controller = $controller;
		}
		
	}
?>
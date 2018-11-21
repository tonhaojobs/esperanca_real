<?php 

	/**
	  * Classe responsável em receber os dados da requisição e efetuar o tratamento dos dados,
	  * validando URL's, Parametros e .......
	  *
	  *
	  */
	
	class HttpClient extends HTTP {
		
		const CODE_STATUS_BAD_REQUEST 		= 400;
		const CODE_STATUS_UNAUTHORIZED 		= 401;
		const CODE_STATUS_PAYMENT_REQUIRED 	= 402;
		const CODE_STATUS_FORBIDEN 			= 403;
		const CODE_STATUS_NOT_FOUND 		= 404;
		
		/**
		  * Função responsável em receber a requisição do usuário 
		  *
		  * @access	public
		  * @param	string $method
		  * @param	string $uri
 		  * @param	string $header
		  * @param	string $body
		  * @return	void
		  *
		  */
		  
		public function __construct($method, $uri, $header, $body) {
			
			parent:: __construct($method, $uri, $header, $body);
			
			// Acessa o diretório do sistema que contém os 'Controllers'
			$dirController = dir(AppConstants::PATH_CONTROLLER);
			
			// Obtém cada arquivo encontrado dentro do diretório
			while (($file = $dirController->read()) !== false){ 
			
				$file_ = pathinfo($file);
				
				// Utiliza apenas os arquivos encontrados que contém a extensão '.php'
				if($file_['extension'] === 'php') {
					
					// Cria uma instância da classe 'ReflectionAnnotatedClass' com cada arquivo php encontrado
					$reflectionClass = new ReflectionAnnotatedClass($file_['filename']);
					// Valida se a classe possui a anotação 'Controller'
					if($reflectionClass->hasAnnotation('Controller')) {
							
						// Recupera a ação e a classe passadas pela URL
						$class = $this->getUri(0);
						$action = $this->getUri(1);
						
						// Valida se o nome da Classe é equivalente ao valor configurado na anotação 'Controller'
						if("/".$class == $reflectionClass->getAnnotation('Controller')->value) {
						
							// Carrega a lista de métodos com assinatura pública da classe
							$methods = $reflectionClass->getMethods(ReflectionMethod::IS_PUBLIC);
							foreach($methods as $method) {
								if(!empty($method->getName())) {
									$reflectionMethod = new ReflectionAnnotatedMethod($reflectionClass->getName(), $method->getName());
									$this->execute($reflectionClass, $reflectionMethod);
								}
							}
						}
					}
				}
			} 
			
			$dirController->close();
		}
		
	/*******************************************************************************************************************************************************************/
		
		private function execute($reflectionClass, $reflectionMethod) {

			// Obtém o nome da função e da classe ...
			$methodName =  $reflectionMethod->getName();
			$className = $reflectionClass->getName();
			
			switch($this->method) {
				
				case AppConstants::GET_METHOD : {
				
					// Verifica se a função contém a anotação 'GetMapping'
					if($reflectionMethod->hasAnnotation('GetMapping')) {
						// Extrai os dados da anotação da função
						$params = explode("/", $reflectionMethod->getAnnotation('GetMapping')->value);
						if($params[1] === $this->getUri(1)) {
							$this->request($className, $reflectionMethod, $params);
						}
					}
					
					break;
				}
				
				case AppConstants::POST_METHOD : {
					
					if($reflectionMethod->hasAnnotation('PostMapping')) {
						$this->request($className, $reflectionMethod, NULL);
					} 
					
					break;
				}
				
				case AppConstants::PUT_METHOD : {
					
					if($reflectionMethod->hasAnnotation('PutMapping')) {
						$paramNames = explode("/", $reflectionMethod->getAnnotation('PutMapping')->value);
						$this->request($className, $reflectionMethod, $params);
					} 
					
					break;
				}
				
				case AppConstants::DELETE_METHOD : {
					
					if($reflectionMethod->hasAnnotation('DeleteMapping')) {
						$paramNames = explode("/", $reflectionMethod->getAnnotation('DeleteMapping')->value);
						$this->request($className, $reflectionMethod, $params);
					} 
				
					break;
				}
				
				default : {
					//echo HttpResponse::response('404', 'NOT FOUND', NULL, AppConstants::RESPONSE_JSON);
					break;
				}
			}
		}
		
		/**
		 *
		 *
		 *
		 *
		 *
		 *
		 */
		
		private function request($className, $reflectionMethod, $params) {

            // Caso o método invocado for POST, esse bloco não deve ser executado.
			if($params !== NULL) {
				$this->_setParams($params);
				$this->controller($className, $reflectionMethod);
				
			} else {
				$this->controller($className, $reflectionMethod);
			} 
		}
		
		/**
		 * Verifica se a ação invocada possui controle de acesso e invoca o método solicitado
		 *
		 * @access private
		 * @param $className
		 * @param $reflectionMethod
		 * @return void
		 *
		 */
		 
		private function controller($className, $reflectionMethod) {
			
			if($reflectionMethod->hasAnnotation('Authorize')) {
				if(JwtProvider::validateToken(HttpRequest::getHeader('token')) && JwtProvider::canAccess($role, HttpRequest::getHeader('token'))) {
					HttpRequest::setToken(JwtProvider::renewToken(HttpRequest::getHeader('token')));
				//	$reflectionMethod->invoke(new $class(), '');
				} else {
					// RETURN ERRO.
					//echo HttpResponse::response('401', 'UNAUTHORIZED', NULL, HttpRequest::getHeader('Content-Type'));
				}
				
			} else {
				$reflectionMethod->invoke(new $className(), $this->getParams());
			}
		}
	}
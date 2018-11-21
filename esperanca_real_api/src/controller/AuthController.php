<?php

	/**
	 * @Controller("/auth")
	 */
	class AuthController extends BaseController {

		/**
		 *
		 * @PostMapping("/signin")
		 *
		 */
		public function logon() {
		
			HttpRequest::setToken(JwtProvider::createToken($this->body['usernameOrEmail'], "ADMIN"));
			
			//echo HttpRequest::getToken();
		}
		
		/**
		 *
		 * @GetMapping("/signout/{user}/{user2}")
		 * @Produces("application/json")
		 *
		 */
		public function logoff() {
			
			echo "aqui";
		}
	}
?>
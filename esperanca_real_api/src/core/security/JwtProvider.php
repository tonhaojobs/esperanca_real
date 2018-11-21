<?php

	class JwtProvider {
		
		private static $header;
		private static $payload;
		private static $signature;
		
		public static function createToken($username, $profile){
			
			self::$header = [
				'alg' => AppConstants::JWT_TOKEN_HEADER_ALGORITHM,
				'typ' => AppConstants::JWT_TOKEN_HEADER_TYPE
			];
			
			self::$header = json_encode(self::$header);
			self::$header = base64_encode(self::$header);
			
			date_default_timezone_set(AppConstants::TIMEZONE);

			$data = new DateTime();
            $createDate = $data->format('d/m/Y H:i:s'); 
            $data = new DateTime('+30 minutes');
            $expireDate = $data->format('d/m/Y H:i:s'); 
			 
			self::$payload = [
				'iss' => AppConstants::JWT_TOKEN_PAYLOAD_ISS_DEV, 	/* DOMÍNIO DA APLICACAO */
				'username' => $username, 							/* USERNAME */
				'iat' => $createDate, 								/* data de criação do token */
				'exp' => $expireDate, 								/* data de expiração do token */
				'profile' => $profile, 								/* perfil do usuário */
				'token_type' => AppConstants::JWT_TOKEN_TYPE
			];
			
			self::$payload = json_encode(self::$payload);
			self::$payload = base64_encode(self::$payload);
			
			self::$signature = hash_hmac('sha512', self::$header.".".self::$payload, 'minha-senha', true);
			self::$signature = base64_encode(self::$signature);
			
			$token = self::$header . '.' . self::$payload . '.' . self::$signature;
			echo $token;
			return $token;
		}
		
		public static function renewToken($token) {
			
			$token_ = explode(".", $token);
			
			$header = $token_[0];
			$payload = $token_[1];
			
			$payload_ = base64_decode($payload);
			$payload_ = json_decode($payload_);
			
			date_default_timezone_set(AppConstants::TIMEZONE);

			$data = new DateTime();
            $createDate = $data->format('d/m/Y H:i:s'); 
            $data = new DateTime('+30 minutes');
            $expireDate = $data->format('d/m/Y H:i:s'); 
			 
			self::$payload = [
				'iss' => AppConstants::JWT_TOKEN_PAYLOAD_ISS_DEV, 	/* DOMÍNIO DA APLICACAO */
				'username' => $payload_->username, 							/* USERNAME */
				'iat' => $createDate, 								/* data de criação do token */
				'exp' => $expireDate, 								/* data de expiração do token */
				'profile' => $payload_->profile, 								/* perfil do usuário */
				'token_type' => AppConstants::JWT_TOKEN_TYPE
			];
			
			self::$payload = json_encode(self::$payload);
			self::$payload = base64_encode(self::$payload);
			
			self::$signature = hash_hmac('sha512', $header.".".self::$payload, 'minha-senha', true);
			self::$signature = base64_encode(self::$signature);
			
			$newToken = $header . '.' . self::$payload . '.' . self::$signature;
			
			return $newToken;
		}
		
		public static function validateToken($token) {
			
			date_default_timezone_set(AppConstants::TIMEZONE);
			
			$validateData = new DateTime();
            $validateData = $validateData->format('d/m/Y H:i:s');
			
			/*se o token informado for vazio*/
			if(is_null($token) || empty($token)) {
				return false;
			} 
			
			$part = explode(".", $token);
			
			$header = $part[0];
			$payload = $part[1];
			$signature = $part[2];
			
			/*se o token informado não for composto por tres partes */
			if(count($part) !== 3) {
				return false;
			}
			
			/*se o token informado for vazio*/
			if(is_null($payload) || empty($payload) 
				|| is_null($header) || empty($header) 
				|| !isset($payload) || !isset($header)) {
				return false;
			}
			
			$payload_ = base64_decode($payload);
			$payload_ = json_decode($payload_);
			
			echo "atual: ". $validateData." <br>criado em: ".$payload_->iat."<br>expira em: ".$payload_->exp." <br>";
			/*se a data de cricao for posteriot à data informada ou a data de expiração for anterior à data informada*/	
			if($validateData > $payload_->exp || $validateData < $payload_->iat){
				return false;
			}
			
			$header_ = base64_decode($header);
			$header_ = json_decode($header_);
			
			$valid = hash_hmac('sha512', $header . "." . $payload, 'minha-senha', true);
			$valid = base64_encode($valid);

			// se a assinatura for inválida
			if($signature !== $valid){
				return false;
			}
			
			return true;
		}
		
		public static function canAccess($role, $token) {
			
			if(is_null($role) || empty($role)) {
				return false;
			}
			
			$roles = explode("|", $role);
			
			$part = explode(".", $token);
			$payload = $part[1];
			
			$payload_ = base64_decode($payload);
			$payload_ = json_decode($payload_);
			
			foreach($roles as $role_) {
				if($role_ === $payload_->profile) {
					return true;
				}
			}
			
			return false;
		}
	}	
?>

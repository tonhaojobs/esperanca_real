<?php
    
    /**
      *
      *
      *
      *
      */

    class User {
        
        private $id;
        private $name;
        private $username;
        private $email;
        private $password;
        private $profile;
        
        public function __construct() {}
        
        public function __construct($name, $username, $email) {
            $this->name = $name;
            $this->username = $username;
            $this->email = $email
        }
        
    }

?>
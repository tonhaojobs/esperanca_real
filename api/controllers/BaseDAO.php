<?php

namespace controllers{
	
    class BaseDAO {

        protected $PDO;
        protected $resultSet;

        const SERVER_NAME = "localhost";
        const DB_NAME = "biblia";
        const USERNAME = "root";
        const PASSWORD = "";

        public function __construct() {
            $this->PDO = new \PDO("mysql:host=".BaseDAO::SERVER_NAME.";dbname=".BaseDAO::DB_NAME, BaseDAO::USERNAME, BaseDAO::PASSWORD);
            $this->PDO->exec("set names utf8");
            $this->PDO->exec("set lc_time_names = 'pt_BR'");
        }
    }
}
<?php

    class BaseDAO {

        protected $conn;
        protected $resultSet;

        const SERVER_NAME = "localhost";
        const DB_NAME = "esperanca_real";
        const USERNAME = "root";
        const PASSWORD = "";

        public function __construct() {
            $this->conn = new PDO("mysql:host=".BaseDAO::SERVER_NAME.";dbname=".BaseDAO::DB_NAME, BaseDAO::USERNAME, BaseDAO::PASSWORD);
            $this->conn->exec("set names utf8");
            $this->conn->exec("set lc_time_names = 'pt_BR'");
        }
    }
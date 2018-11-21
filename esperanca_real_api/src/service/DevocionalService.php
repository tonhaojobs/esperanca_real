<?php

    class DevocionalService {

        private $devocionalDAO;

        public function __construct() {
            $this->devocionalDAO = new DevocionalDAO();
        }

        public function listAllDevotionals() {
            return $this->devocionalDAO->listAll();
        }
    }
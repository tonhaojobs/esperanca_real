<?php

    class CategoriaService {

        private $categoriaDAO;

        public function __construct() {
            $this->categoriaDAO = new CategoriaDAO();
        }

        public function listAllCategories() {
            return $this->categoriaDAO->listAll();
        }
    }
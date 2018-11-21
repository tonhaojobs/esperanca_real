<?php

    class PromessaService {

        private $promessaDAO;

        public function __construct() {
            $this->promessaDAO = new PromessaDAO();
        }

        public function getRandomPromise() {
            $randomId = rand(1, 246);
            return $this->promessaDAO->findById($randomId);
        }

        public function listAllPromises() {
            return $this->promessaDAO->listAll();
        }

        public function createPromise($idLivro, $numCapitulo, $versoInicio) {
            return $this->promessaDAO->createPromise($idLivro, $numCapitulo, $versoInicio);
        }
    }
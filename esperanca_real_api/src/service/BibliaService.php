<?php

    class BibliaService {

        private $bibliaDAO;

        public function __construct() {
            $this->bibliaDAO = new BibliaDAO();
        }

        public function findChapter($nomeLivro, $capitulo, $versao) {
            return $this->bibliaDAO->findChapter($nomeLivro, $capitulo, $versao);
        }

        public function findVerses($nomeLivro, $capitulo, $versos, $versao) {
            return $this->bibliaDAO->findVerses($nomeLivro, $capitulo, $versos, $versao);
        }

        public function findBooks() {
            return $this->bibliaDAO->findBooks();
        }
    }
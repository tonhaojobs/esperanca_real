<?php

    class DevocionalConteudoService {

        private $devocionalConteudoDAO;

        public function __construct() {
            $this->devocionalConteudoDAO = new DevocionalConteudoDAO();
        }

        public function findDevotionalContentByDay($day) {
            return $this->devocionalConteudoDAO->findDevotionalContentByDay($day);
        }

        public function obterAtivosPorDevocional($devocional) {
            $hoje = date("Y-m-d");
            return $this->devocionalConteudoDAO->obterAtivosPorDevocional($devocional, $hoje);
        }

        public function obterPorId($params) {
            return $this->devocionalConteudoDAO->obterPorId($params);
        }
    }
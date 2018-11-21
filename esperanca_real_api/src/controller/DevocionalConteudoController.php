<?php

    /**
     * @Controller("/devocionalConteudo")
     */
    class DevocionalConteudoController extends BaseController {

        private $devocionalConteudoService;

        public function __construct() {
            $this->devocionalConteudoService = new DevocionalConteudoService();
        }

        /**
         * 
         * @GetMapping("/dia/{data}")
         * 
         */
        public function findDevotionalContentByDay($params) {
            $day = $params['data'];

            $result = $this->devocionalConteudoService->findDevotionalContentByDay($day);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @GetMapping("/ativos/{devocional}")
         * 
         */
        public function obterAtivosPorDevocional($params) {
            $devocional = $params['devocional'];

            $result = $this->devocionalConteudoService->obterAtivosPorDevocional($devocional);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @GetMapping("/conteudo/{id}")
         * 
         */
        public function obterPorId($params) {
            $id = $params['id'];

            $result = $this->devocionalConteudoService->obterPorId($id);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @Post("/save")
         * 
         */
        public function saveDevocionalConteudo() {
            
            $tituloDevocional = "";
        }
    }
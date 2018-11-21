<?php

    /**
     * @Controller("/licaoConteudo")
     */
    class LicaoConteudoController extends BaseController {

        private $licaoConteudoService;

        public function __construct() {
            $this->licaoConteudoService = new LicaoConteudoService();
        }

        /**
         * 
         * @GetMapping("/dia/{data}")
         * 
         */
        public function obterPorDia($params) {
            $day = $params['data'];

            $result = $this->devocionalConteudoService->findDevotionalContentByDay($day);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @GetMapping("/ativos/{devocional}")
         * 
         */
        public function obterLicoesDaSemana($params) {
            $devocional = $params['devocional'];

            $result = $this->devocionalConteudoService->obterAtivosPorDevocional($devocional);
            echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        

        /**
         * 
         * @Post("/save")
         * 
         */
        public function saveDevocionalConteudo() {
            // TODO    
        }
    }
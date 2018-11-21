<?php

    /**
     * @Controller("/promessa")
     */
    class PromessaController extends BaseController {

        private $promessaService;

        public function __construct() {
            $this->promessaService = new PromessaService();
        }

        /**
         * 
         * @GetMapping("/promessas")
         * 
         */
        public function listAllPromises() {
            $this->result = $this->promessaService->listAllPromises();
            echo json_encode($this->result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @GetMapping("/promessaAleatoria")
         * 
         */
        public function getRandomPromise() {
            $this->result = $this->promessaService->getRandomPromise();
            echo json_encode($this->result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        /**
         * 
         * @PostMapping("/criarPromessa")
         * 
         */
        public function createPromise() {
           /* $this->result = $this->promessaService->createPromise($idLivro, $numCapitulo, $versoInicio);
            echo json_encode($this->result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);*/
        }
    }
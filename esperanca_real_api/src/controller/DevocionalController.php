<?php
    
    /**
     * @Controller("/devocional")
     */
    class DevocionalController extends BaseController {

        private $devocionalService;

        public function __construct() {
            $this->devocionalService = new DevocionalService();
        }

        /**
         * 
         * @GetMapping("/devocionais")
         * 
         */
        public function listAllDevotionals() {
            $this->result = $this->devocionalService->listAllDevotionals();
            echo json_encode($this->result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

    }
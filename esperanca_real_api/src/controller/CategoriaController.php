<?php
    
    /**
     * @Controller("/categoria")
     */
    class CategoriaController extends BaseController {

        private $categoriaService;

        public function __construct() {
            $this->categoriaService = new CategoriaService();
        }

        /**
         * 
         * @GetMapping("/categorias")
         * 
         */
        public function listAllCategories() {
            $this->result = $this->categoriaService->listAllCategories();
            echo json_encode($this->result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

    }
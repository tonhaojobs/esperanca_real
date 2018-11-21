<?php

    /**
     * @Controller("/licao")
     */
    class LicaoController extends BaseController {

        private $licaoService;

        public function __construct() {
            $this->licaoService = new LicaoService();
        }
    }
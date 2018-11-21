<?php

	/**
	 * @Controller("/biblia")
	 */
	class BibliaController extends BaseController {

		private $bibliaService;

		public function __construct() {
			$this->bibliaService = new BibliaService();
		}

        /**
		 *
		 * @GetMapping("/capitulo/{nome}/{capitulo}/{versao}")
		 *
		 */
		public function findChapter($params) {

			$nomeLivro = $params['nome'];
			$capitulo = $params['capitulo'];
			$versao = $params['versao'];

            $result = $this->bibliaService->findChapter($nomeLivro, $capitulo, $versao);
			echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		}

		/**
		 *
		 * @GetMapping("/versos/{nome}/{capitulo}/{versos}/{versao}")
		 *
		 */
		public function findVerses($params) {

			$nomeLivro = $params['nome'];
			$capitulo = $params['capitulo'];
			$versos = $params['versos'];
			$versao = $params['versao'];

			$result = $this->bibliaService->findVerses($nomeLivro, $capitulo, $versos, $versao);
			echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		}

		/**
		 *
		 * @GetMapping("/livros")
		 *
		 */
		public function findBooks() {

			$result = $this->bibliaService->findBooks();
			echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
		}
    }
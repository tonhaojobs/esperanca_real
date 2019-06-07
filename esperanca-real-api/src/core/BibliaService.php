<?php

namespace Service;

require_once 'BibliaDAO.php';

class BibliaService {

	private $bibliaDAO;
	
	public function __construct() {;
		$this->bibliaDAO = new \Dao\BibliaDAO();
	}
	
	public function findAllTestamentos(){
		return $this->bibliaDAO->findAllTestamentos();
	}
	
	public function findAllVersoes(){
		return $this->bibliaDAO->findAllVersoes();
	}
	
	public function findLivrosByTestamento($id){
		return $this->bibliaDAO->findLivrosByTestamento($id);
	}
	
	public function findTestamentoById($id){
		return $this->bibliaDAO->findTestamentoById($id);
	}
	
	public function findLivroById($id){
		return $this->bibliaDAO->findLivroById($id);
	}
	
	public function findCapitulo($livro, $capitulo, $versao) {
		return $this->bibliaDAO->findCapitulo($livro, $capitulo, $versao);
	}

	public function search($palavraChave, $versao) {
		return $this->bibliaDAO->search($palavraChave, $versao);
	}
	
	public function login($email, $senha) {
	//	$senhaCriptografada = $this->getSenhaCriptografada($senha);
		$senhaCriptografada = $senha;
		return $this->bibliaDAO->login($email, $senhaCriptografada);
	}
	
	
	public function createHistorico($usuario, $livro, $capitulo, $versao) {
		
		$data = date('d-m-Y H:i:s');
		return $this->bibliaDAO->createHistorico($usuario, $livro, $capitulo, $versao, $data);
	}
	
	private function getSenhaCriptografada($senha) {
		
		$salt = md5("@33sp33r44nc44_Ree44L");
		
		$senhaCriptografada = crypt($senha, $salt);
		$senhaCriptografada = hash('sha512', $senhaCriptografada);
		
		return $senhaCriptografada;
	}
}

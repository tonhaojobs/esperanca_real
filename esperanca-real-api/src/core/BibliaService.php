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
	
	public function findVersaoById($id){
		return $this->bibliaDAO->findVersaoById($id);
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
		$senhaCriptografada = $this->getSenhaCriptografada($senha);
		return $this->bibliaDAO->login($email, $senhaCriptografada);
	}
	
	
	public function createHistorico($usuario, $livro, $capitulo, $versao) {
		
		if($this->bibliaDAO->countHistorico($usuario, $livro, $versao, $capitulo) == 0) {
			
			if($this->bibliaDAO->createHistorico($usuario, $livro, $capitulo, $versao)) {
				return "Historico cadastrado com sucesso!";
			} else {
				return "Ocorreu um erro";
			}
			
		} else {
			return "Ja cadastrado";
		}
	}
	
	private function getSenhaCriptografada($senha) {
		
		$salt = md5("33sp33r44nc44_Ree44L");
		$senhaCriptografada_ = crypt($senha, '$6$rounds=12000$'.$salt);
		$senhaCriptografada = hash('sha512', $senhaCriptografada_);
		
		return $senhaCriptografada;
	}
	
	public function cadastro($primeiroNome, $ultimoNome, $email, $senha) {

		$count = $this->bibliaDAO->getUsuarioByEmail($email);
		
		if($count == 0) {
			$senhaCriptografada = $this->getSenhaCriptografada($senha);
			return $this->bibliaDAO->cadastro($primeiroNome, $ultimoNome, $email, $senhaCriptografada);
		} 
	}
}

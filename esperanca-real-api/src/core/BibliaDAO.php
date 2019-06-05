<?php

namespace Dao;

class BibliaDAO {
	
	protected $PDO;
	protected $resultSet;

	const SERVER_NAME = "localhost";
	const DB_NAME = "biblia";
	const USERNAME = "root";
	const PASSWORD = "";

	public function __construct() {
		$this->PDO = new \PDO("mysql:host=".BibliaDAO::SERVER_NAME.";dbname=".BibliaDAO::DB_NAME, BibliaDAO::USERNAME, BibliaDAO::PASSWORD);
		$this->PDO->exec("set names utf8");
		$this->PDO->exec("set lc_time_names = 'pt_BR'");
	}
	

	public function findAllTestamentos(){
		
		$this->resultSet = $this->PDO->prepare("SELECT id_testamento AS id, nome, abreviacao FROM biblia.testamento ORDER BY id_testamento ");
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findAllVersoes(){
		
		$this->resultSet = $this->PDO->prepare("SELECT id_versao AS id, nome AS nome, sigla AS sigla FROM biblia.versao WHERE flag_ativo = 1 ORDER BY nome ");
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findLivrosByTestamento($id){
		
		$sql  = " SELECT ";
		$sql .= " l.id_livro AS id, l.posicao AS posicao, l.nome AS nome, l.abreviacao AS abreviacao, l.num_capitulos AS numeroCapitulos, c.nome as categoria ";
		$sql .= " FROM biblia.livro l ";
		$sql .= " INNER JOIN biblia.livro_categoria c ";
		$sql .= " ON l.id_categoria = c.id_livro_categoria ";
		$sql .= " AND id_testamento = :id ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':id', $id);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findTestamentoById($id){
		
		$sql  = " SELECT ";
		$sql .= " id_testamento AS id, nome AS nome, abreviacao AS abreviacao ";
		$sql .= " FROM biblia.testamento ";
		$sql .= " WHERE id_testamento = :id ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':id', $id);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findLivroById($id){
		
		$sql  = " SELECT ";
		$sql .= " l.id_livro AS id, l.posicao AS posicao, l.nome AS nome, l.abreviacao AS abreviacao, l.num_capitulos AS numeroCapitulos, c.nome as categoria ";
		$sql .= " FROM biblia.livro l ";
		$sql .= " INNER JOIN biblia.livro_categoria c ";
		$sql .= " ON l.id_categoria = c.id_livro_categoria ";
		$sql .= " AND id_livro = :id ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':id', $id);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findCapitulo($livro, $capitulo, $versao) {

		$sql  = " SELECT ";
		$sql .= " bv.num_versiculo AS versiculo, bv.texto AS texto ";
		$sql .= " FROM biblia.versiculo bv ";
		$sql .= " INNER JOIN biblia.livro l ";
		$sql .= " ON l.id_livro = bv.id_livro ";
		$sql .= " WHERE l.id_livro = :livro ";
		$sql .= " AND bv.num_capitulo = :capitulo ";
		$sql .= " AND bv.id_versao = :versao ";
		$sql .= " ORDER BY bv.num_versiculo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':livro', $livro);
		$this->resultSet->bindValue(':capitulo', $capitulo);
		$this->resultSet->bindValue(':versao', $versao);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}

	public function search($palavraChave, $versao) {

		$sql  = " SELECT ";
		$sql .= " bv.id_versiculo, l.id_livro AS livro, l.nome, bv.num_capitulo AS capitulo, bv.num_versiculo AS versiculo, bv.texto AS texto ";
		$sql .= " FROM biblia.versiculo bv ";
		$sql .= " INNER JOIN biblia.livro l ";
		$sql .= " ON l.id_livro = bv.id_livro ";
		$sql .= " WHERE UPPER(bv.texto) LIKE UPPER(:palavraChave) ";
		$sql .= " AND bv.id_versao = :versao ";
		$sql .= " ORDER BY l.id_livro, bv.num_capitulo, bv.num_versiculo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':palavraChave', '%'. $palavraChave .'%');
		$this->resultSet->bindValue(':versao', $versao);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function login($email, $senha) {
		
		$sql  = " SELECT ";
		$sql .= " id_usuario AS id, CONCAT(primeiro_nome, ' ', ultimo_nome) AS nome, email ";
		$sql .= " FROM biblia.usuario ";
		$sql .= " WHERE email = :email AND senha = :senha ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':email', $email);
		$this->resultSet->bindValue(':senha', $senha);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
}

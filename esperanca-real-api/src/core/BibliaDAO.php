<?php

namespace Dao;

class BibliaDAO {
	
	protected $PDO;
	protected $resultSet;

	const SERVER_NAME = "localhost";
	const DB_NAME = "sdkyfpcr_biblia";
	const USERNAME = "sdkyfpcr_33sp33r44nc44_Ree44L";
	const PASSWORD = "33sp33r44nc44_Ree44L";

	public function __construct() {
		$this->PDO = new \PDO("mysql:host=".BibliaDAO::SERVER_NAME.";dbname=".BibliaDAO::DB_NAME, BibliaDAO::USERNAME, BibliaDAO::PASSWORD);
		$this->PDO->exec("set names utf8");
		$this->PDO->exec("set lc_time_names = 'pt_BR'");
	}
	

	public function findAllTestamentos(){
		
		$this->resultSet = $this->PDO->prepare("SELECT id_testamento AS id, nome, abreviacao FROM sdkyfpcr_biblia.testamento ORDER BY id_testamento ");
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findAllVersoes(){
		
		$this->resultSet = $this->PDO->prepare("SELECT id_versao AS id, nome AS nome, sigla AS sigla FROM sdkyfpcr_biblia.versao WHERE flag_ativo = 1 ORDER BY nome ");
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findLivrosByTestamento($id){
		
		$sql  = " SELECT ";
		$sql .= " l.id_livro AS id, l.posicao AS posicao, l.nome AS nome, l.abreviacao AS abreviacao, l.num_capitulos AS numeroCapitulos, c.nome as categoria ";
		$sql .= " FROM sdkyfpcr_biblia.livro l ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro_categoria c ";
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
		$sql .= " FROM sdkyfpcr_biblia.testamento ";
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
		$sql .= " FROM sdkyfpcr_biblia.livro l ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro_categoria c ";
		$sql .= " ON l.id_categoria = c.id_livro_categoria ";
		$sql .= " AND id_livro = :id ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':id', $id);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}	
	
	public function findVersaoById($id){
		
		$sql  = " SELECT ";
		$sql .= " id_versao AS id, nome, sigla ";
		$sql .= " FROM sdkyfpcr_biblia.versao ";
		$sql .= " WHERE id_versao = :id ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':id', $id);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function findCapitulo($livro, $capitulo, $versao) {

		$sql  = " SELECT ";
		$sql .= " bv.num_versiculo AS versiculo, bv.texto AS texto ";
		$sql .= " FROM sdkyfpcr_biblia.versiculo bv ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro l ";
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
		$sql .= " FROM sdkyfpcr_biblia.versiculo bv ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro l ";
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
		$sql .= " FROM sdkyfpcr_biblia.usuario ";
		$sql .= " WHERE email = :email AND senha = :senha ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':email', $email);
		$this->resultSet->bindValue(':senha', $senha);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	public function createHistorico($usuario, $livro, $capitulo, $versao) {
		
		try{
			$sql  = " INSERT INTO sdkyfpcr_biblia.usuario_historico (id_usuario, id_livro, id_versao, num_capitulo, dt_historico) ";
			$sql .= " VALUES (:usuario, :livro, :versao, :capitulo, NOW()) ";

			$this->resultSet = $this->PDO->prepare($sql);
			
			$this->resultSet->bindValue(':usuario', $usuario);
			$this->resultSet->bindValue(':livro', $livro);
			$this->resultSet->bindValue(':capitulo', $capitulo);
			$this->resultSet->bindValue(':versao', $versao);

			$result = $this->resultSet->execute();
		
			return $result;	
			
		} catch (PDOException $ex) {
			return $ex->getCode();
		}
	}
	
	public function countHistorico($usuario, $livro, $versao, $capitulo) {
		
		$sql  = " SELECT COUNT(*) FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= " WHERE id_usuario = :usuario AND id_livro = :livro AND id_versao = :versao AND num_capitulo = :capitulo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':usuario', $usuario);
		$this->resultSet->bindValue(':livro', $livro);
		$this->resultSet->bindValue(':versao', $versao);
		$this->resultSet->bindValue(':capitulo', $capitulo);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchColumn(); 
		
		return $result;
	}
	
	public function getHistorico($usuario) {
		
		$sql  = " SELECT h.id_livro, l.nome AS nome, l.abreviacao AS abreviacao, h.num_capitulo, DATE_FORMAT(h.dt_historico, '%d/%m/%Y') dt_historico ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico h ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro l ";
		$sql .= " ON l.id_livro = h.id_livro ";
		$sql .= " WHERE h.id_usuario = :usuario ";
		$sql .= " GROUP BY h.id_livro, h.num_capitulo ";
		$sql .= " ORDER BY h.id_livro, h.num_capitulo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':usuario', $usuario);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC); 
		
		return $result;
	}
	
	public function getHistoricoByLivro($usuario, $livro) {
		
		$sql  = " SELECT ";
		$sql .= " 	(SELECT COUNT(*) ";
		$sql .= "		FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= "		WHERE id_livro = h.id_livro ";
		$sql .= " 		AND id_usuario = :usuario ";
		$sql .= "		AND id_livro = :livro) capitulos_lidos, ";
		$sql .= " 	FORMAT( ";
		$sql .= "	(SELECT COUNT(*) ";
		$sql .= "		FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= "		WHERE id_livro = h.id_livro ";
		$sql .=	" 		AND id_usuario = :usuario ";
		$sql .= " 		AND id_livro = :livro) * 100 / l.num_capitulos, 1) porcentagem ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico h ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro l ";
		$sql .= " ON l.id_livro = h.id_livro ";
		$sql .= " WHERE h.id_usuario = :usuario ";
		$sql .= " 	AND h.id_livro = :livro ";
		$sql .= " GROUP BY h.id_livro ";
		$sql .= " ORDER BY h.id_livro, h.num_capitulo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		$this->resultSet->bindValue(':usuario', $usuario);
		$this->resultSet->bindValue(':livro', $livro);

		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC); 
		
		return $result;
	}
	
	public function getHistoricoByData($usuario) {
		
		$sql  = " SELECT "; 
		$sql .= " DATE_FORMAT(hl.dt_historico, '%d/%m/%Y') dataHistorico, "; 
		$sql .= " GROUP_CONCAT(CONCAT('  ', l.nome, ' ', hl.num_capitulo)) textos, ";
		$sql .= " COUNT(hl.num_capitulo) quantidade ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico hl ";
		$sql .= " INNER JOIN sdkyfpcr_biblia.livro l ON l.id_livro = hl.id_livro ";
		$sql .= " WHERE id_usuario = :usuario ";
		$sql .= " GROUP BY DATE_FORMAT(dt_historico, '%d/%m/%Y') ";
		$sql .= " ORDER BY DATE_FORMAT(dt_historico, '%Y/%m/%d') DESC ";

		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':usuario', $usuario);
		
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC); 
		
		return $result;
	}
	
	public function getHistoricoByLivroCapitulo($usuario, $livro, $capitulo) {
		
		$sql  = " SELECT COUNT(*) FROM sdkyfpcr_biblia.usuario_historico WHERE id_usuario = :usuario AND id_livro = :livro AND num_capitulo = :capitulo ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':usuario', $usuario);
		$this->resultSet->bindValue(':livro', $livro);
		$this->resultSet->bindValue(':capitulo', $capitulo);
		
		$this->resultSet->execute();
		$result = $this->resultSet->fetchColumn(); 

		return $result;
	}
	
	public function getHistoricoGeral($usuario) {
	
		$sql  = " SELECT ";
		$sql .= " (SELECT COUNT(*) ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= " WHERE id_usuario = :usuario) capitulos_lidos, ";
		$sql .= " FORMAT( ";
		$sql .= " (SELECT COUNT(*) ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= " WHERE id_usuario = :usuario ";
		$sql .= " )* 100 / 1189, 1) porcentagem ";
		$sql .= " FROM sdkyfpcr_biblia.usuario_historico ";
		$sql .= " WHERE id_usuario = :usuario ";
		$sql .= " GROUP BY id_usuario ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':usuario', $usuario);
		
		$this->resultSet->execute();
		$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC); 
		
		return $result;
	}
	
	public function getUsuarioByEmail($email) {
		
		$sql  = " SELECT COUNT(*) FROM sdkyfpcr_biblia.usuario ";
		$sql .= " WHERE email = :email ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':email', $email);
		$this->resultSet->execute();
		$result = $this->resultSet->fetchColumn(); 
		
		return $result;
	}
	
	public function findUsuarioBySenha($usuario, $senha) {
		
		$sql  = " SELECT COUNT(*) FROM sdkyfpcr_biblia.usuario ";
		$sql .= " WHERE id_usuario = :usuario ";
		$sql .= " AND senha = :senha ";
		
		$this->resultSet = $this->PDO->prepare($sql);
		
		$this->resultSet->bindValue(':usuario', $usuario);
		$this->resultSet->bindValue(':senha', $senha);
		
		$this->resultSet->execute();
		$result = $this->resultSet->fetchColumn(); 
		
		return $result;
	}
	
	public function alterarSenhaUsuario($usuario, $senha) {
		
		try{
			$sql  = " UPDATE sdkyfpcr_biblia.usuario SET senha = :senha WHERE id_usuario = :usuario ";
			
			$this->resultSet = $this->PDO->prepare($sql);
			
			$this->resultSet->bindValue(':usuario', $usuario);
			$this->resultSet->bindValue(':senha', $senha);
			$this->resultSet->execute();
			$result = $this->resultSet->rowCount(); 
			
			return $result;
		
		} catch (PDOException $ex) {
			return $ex->getCode();
		}
	}
	
	public function cadastro($primeiroNome, $ultimoNome, $email, $senha) {
		
		try{
			$sql  = " INSERT INTO sdkyfpcr_biblia.usuario (primeiro_nome, ultimo_nome, email, senha) ";
			$sql .= " VALUES (:primeiroNome, :ultimoNome, :email, :senha) ";
			
			$this->resultSet = $this->PDO->prepare($sql);
			
			$this->resultSet->bindValue(':primeiroNome', $primeiroNome);
			$this->resultSet->bindValue(':ultimoNome', $ultimoNome);
			$this->resultSet->bindValue(':email', $email);
			$this->resultSet->bindValue(':senha', $senha);

			$result = $this->resultSet->execute();
			
			return $result;	
			
		} catch (PDOException $ex) {
			return $ex->getCode();
		}
	}
}

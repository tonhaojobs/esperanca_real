<?php
namespace controllers{
	
	class Biblia extends BaseDAO {

		/*
		*
		*/
		public function findAllTestamentos(){
			global $app;
			
			$this->resultSet = $this->PDO->prepare("SELECT id_testamento AS id, nome, abreviacao FROM biblia.testamento ORDER BY id_testamento ");
			$this->resultSet->execute();
			$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
			$app->render('default.php',["data"=>$result],200); 
		}
		
		public function findAllVersoes(){
			global $app;
			
			$this->resultSet = $this->PDO->prepare("SELECT id_versao AS id, nome AS nome, sigla AS sigla FROM biblia.versao WHERE flag_ativo = 1 ORDER BY nome ");
			$this->resultSet->execute();
			$result = $this->resultSet->fetchAll(\PDO::FETCH_ASSOC);
			$app->render('default.php',["data"=>$result],200); 
		}
		
		/*
		*
		*/
		public function findLivrosByTestamento($id){
			global $app;
			
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
			$app->render('default.php',["data"=>$result],200); 
		}
		
		public function findLivroById($id){
			global $app;
			
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
			$app->render('default.php',["data"=>$result],200); 
		}
		
		public function findCapitulo($livro, $capitulo, $versao) {

			global $app;

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
			$app->render('default.php',["data"=>$result],200); 
		}		
	}
}
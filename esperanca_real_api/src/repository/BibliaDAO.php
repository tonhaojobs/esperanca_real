<?php

	class BibliaDAO extends BaseDAO {
		
		public function findAllLivros() {
						
		}
		
		/**
		 * Retorna o texto de um determinado capitulo
		 */
		public function findChapter($nomeLivro, $capitulo, $versao) {

			try {

				$sql  = " SELECT ";
				$sql .= " bv.num_capitulo, bv.num_versiculo, bv.txt_versiculo ";
				$sql .= " FROM esperanca_real.er_biblia_versiculo bv ";
				$sql .= " INNER JOIN esperanca_real.er_biblia_livro l ";
				$sql .= " ON l.id_livro = bv.id_livro ";
				$sql .= " WHERE l.nome_livro = :nomeLivro ";
				$sql .= " AND bv.num_capitulo = :capitulo ";
				$sql .= " AND bv.id_versao = :versao ";
				$sql .= " ORDER BY bv.num_versiculo ";
				
				$this->resultSet = $this->conn->prepare($sql);
				
				$this->resultSet->bindValue(':nomeLivro', $nomeLivro);
				$this->resultSet->bindValue(':capitulo', $capitulo);
				$this->resultSet->bindValue(':versao', $versao);

				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);
			
			} catch (Exception $ex) {
				echo $e->getMessage();
			}
		}		
		
		/**
		 * Retorna o texto de um ou mais versiculos
		 */
		public function findVerses($nomeLivro, $capitulo, $versos, $versao) {

			try {

				$sql  = " SELECT ";
				$sql .= " bv.num_capitulo, bv.num_versiculo, bv.txt_versiculo ";
				$sql .= " FROM esperanca_real.er_biblia_versiculo bv ";
				$sql .= " INNER JOIN esperanca_real.er_biblia_livro l ";
				$sql .= " ON l.id_livro = bv.id_livro ";
				$sql .= " WHERE l.nome_livro = :nomeLivro ";
				$sql .= " AND bv.num_capitulo = :capitulo ";
				$sql .= " AND bv.num_versiculo IN (".$versos.") ";
				$sql .= " AND bv.id_versao = :versao ";
				$sql .= " ORDER BY bv.num_versiculo ";
				
				$this->resultSet = $this->conn->prepare($sql);
				
				$this->resultSet->bindValue(':nomeLivro', $nomeLivro);
				$this->resultSet->bindValue(':capitulo', $capitulo);
				$this->resultSet->bindValue(':versao', $versao);

				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);
			
			} catch (Exception $ex) {
				echo $e->getMessage();
			}
		}

		/**
		 * Retorna lista com todos os livros
		 */
		public function findBooks() {

			try {

				$sql  = " SELECT ";
				$sql .= " id_livro, nome_livro, abrev_livro ";
				$sql .= " FROM esperanca_real.er_biblia_livro ";
				$sql .= " ORDER BY id_testamento, posicao ";
				
				$this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);
			
			} catch (Exception $ex) {
				echo $e->getMessage();
			}
		}
	}
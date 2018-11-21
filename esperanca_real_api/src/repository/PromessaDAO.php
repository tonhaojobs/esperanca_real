<?php

    class PromessaDAO extends BaseDAO {

        public function findById($id) {

            try {

                $sql   = " SELECT bv.txt_versiculo, l.nome_livro, p.num_capitulo, p.verso_inicio ";
                $sql  .= " FROM esperanca_real.er_promessa p ";
                $sql  .= " INNER JOIN esperanca_real.er_biblia_livro l ";
                $sql  .= " ON l.id_livro = p.id_livro ";
                $sql  .= " INNER JOIN  esperanca_real.er_biblia_versiculo bv ";
                $sql  .= " ON bv.id_livro = l.id_livro ";
                $sql  .= " WHERE p.id_promessa = :id ";
                $sql  .= " AND bv.num_versiculo = p.verso_inicio ";
                $sql  .= " AND bv.num_capitulo = p.num_capitulo ";
                $sql  .= " AND bv.id_versao = 3 ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->bindValue(':id', $id);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch(Exception $ex) {
                return $ex->getMessage();
            }
        }

        public function listAll() {

            try {

                $sql   = " SELECT bv.txt_versiculo, l.nome_livro, p.num_capitulo, p.verso_inicio ";
                $sql  .= " FROM esperanca_real.er_promessa p ";
                $sql  .= " INNER JOIN esperanca_real.er_biblia_livro l ";
                $sql  .= " ON l.id_livro = p.id_livro ";
                $sql  .= " INNER JOIN  esperanca_real.er_biblia_versiculo bv ";
                $sql  .= " ON bv.id_livro = l.id_livro ";
                $sql  .= " WHERE bv.id_versao = 3 ";
                $sql  .= " AND bv.num_versiculo = p.verso_inicio ";
                $sql  .= " AND bv.num_capitulo = p.num_capitulo ";
                $sql  .= " ORDER BY l.id_testamento, l.posicao, p.num_capitulo, p.verso_inicio ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch(Exception $ex) {
                return $ex->getMessage();
            }
        }

        public function createPromise($idLivro, $numCapitulo, $versoInicio) {

            try {

                $sql  = " INSERT INTO esperanca_real.er_promessa(id_livro, num_capitulo, verso_inicio, verso_fim) ";
                $sql .= " VALUES (:idLivro, :numCapitulo, :versoInicio, :versoFim) ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->bindValue(':idLivro', $idLivro);
				$this->resultSet->bindValue(':numCapitulo', $numCapitulo);
                $this->resultSet->bindValue(':versoInicio', $versoInicio);
                $this->resultSet->bindValue(':versoFim', $versoInicio);
                $this->resultSet->execute();

                return $this->resultSet->rowCount();

            } catch(Exception $ex) {
                return $ex->getMessage();
            }
        }
    }
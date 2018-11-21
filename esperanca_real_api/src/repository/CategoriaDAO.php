<?php

    class CategoriaDAO extends BaseDAO {


        public function listAll() {

            try {

                $sql  =  " SELECT cat.id_categoria, cat.descr_categoria ";
                $sql .=  " FROM esperanca_real.er_categoria cat ";
                $sql .=  " WHERE cat.fl_ativo = 1 ";
                $sql .=  " ORDER BY cat.descr_categoria ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch (Exception $ex) {
                return $ex->getMessage();
            }
        }

        public function create($descricao) {

            try {

                $sql  =  " INSERT INTO ";
                $sql .=  " esperanca_real.er_categoria (descr_categoria, fl_ativo) ";
                $sql .=  " VALUES ";
                $sql .=  " (':descricao', '1') ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->bindValue(':descricao', $descricao);
                $this->resultSet->execute();

                return $this->resultSet->rowCount();

            } catch (Exception $ex) {
                return $ex->getMessage();
            }
        }
    }
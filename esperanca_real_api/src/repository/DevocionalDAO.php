<?php

    class DevocionalDAO extends BaseDAO {

        public function listAll() {

            try {

                $sql  =  " SELECT dev.id_devocional, dev.descr_devocional, dev.ano_devocional, dev.fl_permanente ";
                $sql .=  " FROM esperanca_real.er_devocional dev ";
                $sql .=  " WHERE dev.fl_ativo = 1 ";
                $sql .=  " ORDER BY dev.descr_devocional ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch (Exception $ex) {
                return $ex->getMessage();
            }
        }

        public function create($descricao, $ano, $permanente) {

            try {

                $sql  =  " INSERT INTO ";
                $sql .=  " esperanca_real.er_devocional (descr_devocional, ano_devocional, fl_permanente, fl_ativo) ";
                $sql .=  " VALUES ";
                $sql .=  " (':descricao', :ano, :permanente, '1') ";

                $this->resultSet = $this->conn->prepare($sql);
                $this->resultSet->bindValue(':descricao', $descricao);
                $this->resultSet->bindValue(':ano', $ano);
                $this->resultSet->bindValue(':permanente', $permanente);
                $this->resultSet->execute();

                return $this->resultSet->rowCount();

            } catch (Exception $ex) {
                return $ex->getMessage();
            }
        }
    }
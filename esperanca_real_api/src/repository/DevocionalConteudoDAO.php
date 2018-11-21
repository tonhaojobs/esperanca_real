<?php

    class DevocionalConteudoDAO extends BaseDAO {

        public function findDevotionalContentByDay($day) {

            try {

                $sql  = " SELECT ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%W')) AS dia_vicualizacao, ";
                $sql .= " date_format(dc.dt_visualizacao, '%d') AS dt_visualizacao, ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%M')) AS mes_visualizacao, ";
                $sql .= " dc.titulo_devocional, dc.txt_verso_biblico, dc.txt_publicacao ";
                $sql .= " FROM esperanca_real.er_devocional_conteudo dc ";
                $sql .= " WHERE dc.dt_visualizacao = :day ";
                $sql .= " AND dc.fl_ativo = '1' ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->bindValue(':day', $day);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch(Exception $ex) {
                return $ex->getMessage();
            } finally {}
        }

        public function obterPorId($id) {

            try {

                $sql  = " SELECT ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%W')) AS dia_vicualizacao, ";
                $sql .= " date_format(dc.dt_visualizacao, '%d') AS dt_visualizacao, ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%M')) AS mes_visualizacao, ";
                $sql .= " dc.titulo_devocional, dc.txt_verso_biblico, dc.txt_publicacao ";
                $sql .= " FROM esperanca_real.er_devocional_conteudo dc ";
                $sql .= " WHERE dc.id_devocional_conteudo = :id ";

                $this->resultSet = $this->conn->prepare($sql);
				$this->resultSet->bindValue(':id', $id);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch(Exception $ex) {
                return $ex->getMessage();
            } finally {}
        }

        public function obterAtivosPorDevocional($devocional, $dataAtual) {

            try {

                $sql  = " SELECT ";
                $sql .= " dc.id_devocional_conteudo, dc.titulo_devocional, ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%W')) AS dia_vicualizacao, ";
                $sql .= " date_format(dc.dt_visualizacao, '%d') AS dt_visualizacao, ";
                $sql .= " esperanca_real.upperfirst(date_format(dc.dt_visualizacao, '%M')) AS mes_visualizacao ";
                $sql .= " FROM esperanca_real.er_devocional_conteudo dc ";
                $sql .= " WHERE dc.id_devocional = :devocional ";
                $sql .= " AND dc.fl_ativo = '1' ";
                $sql .= " AND (:dataAtual BETWEEN dc.dt_visualizacao_ini AND dc.dt_visualizacao_fim) ";
                $sql .= " ORDER BY dc.dt_visualizacao ";

                $this->resultSet = $this->conn->prepare($sql);
                $this->resultSet->bindValue(':devocional', $devocional);
                $this->resultSet->bindValue(':dataAtual', $dataAtual);
				$this->resultSet->execute();

				return $this->resultSet->fetchAll(PDO::FETCH_ASSOC);

            } catch(Exception $ex) {
                return $ex->getMessage();
            } finally {}
        }
    }
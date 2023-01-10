-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 10-Jan-2023 às 13:17
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dmei_sys`
--
CREATE DATABASE IF NOT EXISTS `dmei_sys` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `dmei_sys`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `entities`
--

DROP TABLE IF EXISTS `entities`;
CREATE TABLE IF NOT EXISTS `entities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` int NOT NULL,
  `name_manager` varchar(100) NOT NULL,
  `phone_manager` int NOT NULL,
  `district_adress` varchar(50) NOT NULL,
  `cep_adress` int NOT NULL,
  `number_adress` int NOT NULL,
  `zone_adress` varchar(50) NOT NULL,
  `street_adress` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `external_scheduling`
--

DROP TABLE IF EXISTS `external_scheduling`;
CREATE TABLE IF NOT EXISTS `external_scheduling` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_entity` int NOT NULL,
  `problem` text NOT NULL,
  `date_ scheduling` date NOT NULL,
  `id_ user` int NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_entity` (`id_entity`),
  KEY `id_user_fk` (`id_ user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `input_equipment`
--

DROP TABLE IF EXISTS `input_equipment`;
CREATE TABLE IF NOT EXISTS `input_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_entity` int NOT NULL,
  `equipment` varchar(100) NOT NULL,
  `peripheral` tinyint(1) NOT NULL,
  `problem` text NOT NULL,
  `date_input` date NOT NULL,
  `date_exit` date NOT NULL,
  `service_performed` text NOT NULL,
  `id_ user` int NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_user` (`id_ user`),
  KEY `id_entity_fk` (`id_entity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `service_internal`
--

DROP TABLE IF EXISTS `service_internal`;
CREATE TABLE IF NOT EXISTS `service_internal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_entity` int NOT NULL,
  `problem` text NOT NULL,
  `id_ user` int NOT NULL,
  `service_performed` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idEntity_fk` (`id_entity`),
  KEY `idUser_fk` (`id_ user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `realname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `external_scheduling`
--
ALTER TABLE `external_scheduling`
  ADD CONSTRAINT `fk_id_entity` FOREIGN KEY (`id_entity`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `id_user_fk` FOREIGN KEY (`id_ user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `input_equipment`
--
ALTER TABLE `input_equipment`
  ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_ user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `id_entity_fk` FOREIGN KEY (`id_entity`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `service_internal`
--
ALTER TABLE `service_internal`
  ADD CONSTRAINT `idEntity_fk` FOREIGN KEY (`id_entity`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `idUser_fk` FOREIGN KEY (`id_ user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

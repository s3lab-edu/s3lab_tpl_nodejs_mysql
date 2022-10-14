-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: db4free.net    Database: image_archive
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(64) COLLATE utf8mb3_bin NOT NULL,
  `name` varchar(64) COLLATE utf8mb3_bin DEFAULT 'null',
  `desc` varchar(256) COLLATE utf8mb3_bin DEFAULT 'null',
  `isAlive` tinyint DEFAULT '1',
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `siteCode` varchar(45) COLLATE utf8mb3_bin DEFAULT '',
  `companyCode` varchar(45) COLLATE utf8mb3_bin DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'dv001','camera','this is the internet device hehe',1,1,1,NULL,'2022-09-20','',''),(2,'dv002','router','this is the internet device',1,1,1,NULL,'2022-09-20','',''),(3,'dv002','router','null',1,5,5,NULL,NULL,'',''),(4,'dv005','sensor','this is the sensor of a conditioner',1,5,5,NULL,'2022-10-01','',''),(5,'dv005','S3LAB','this is the sensor of a conditioner',1,5,5,NULL,'2022-10-01','',''),(6,'dv001','camera','null',1,1,1,NULL,NULL,'','');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `loginName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `firstName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `lastName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `displayName` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `language` char(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT 'en' COMMENT '2 characters, and follow the contry code: ko, vi, ...',
  `type` tinyint(1) NOT NULL DEFAULT '2' COMMENT 'value: 1 - anonymous, 2 - normal user, 3 - moderator, 4 - admin, 5- super admin',
  `system` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'forever user, noone can delete or deactivate these user, 0: none system, 1: system',
  `activated` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: none activated; 1: activated',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdBy` bigint NOT NULL,
  `updatedBy` bigint NOT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `loginName_UNIQUE` (`loginName`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sadmin@gmail.com','sadmin','$2a$10$Q3llO06jGHgGO3.gpsoYJ.HkinyP92xmV0SFWTyaYwGbxOo0XzEDe','sadmin','System','super admin','en',5,1,1,0,1,1,'2020-03-02 04:48:57','2020-02-23 15:31:20'),(2,'anonymous@gmail.com','anonymous','$2a$10$Q3llO06jGHgGO3.gpsoYJ.HkinyP92xmV0SFWTyaYwGbxOo0XzEDe','Anonymous','System','Anonymous','en',1,1,1,0,1,1,'2020-02-23 15:35:14','2020-02-23 15:35:14'),(3,'hoanganh@gmail.com','hoanganh','$2a$10$GGozPdcqLoHWDNWKDrjouOj0.BwKXuGwFPhKPxhU6pD5yjKWzdQlq','Hoang','Anh','hoanganh','en',3,0,1,0,1,1,'2020-03-02 09:09:59','2020-03-02 09:09:59'),(5,'dientv@gmail.com','dientv','$2a$10$H84iJA1jDRLrY2837dW3V.VNELjQcf.pq./ulnRH5kkZE.WE3XHuG',NULL,NULL,'dientv','en',2,0,1,0,1,1,'2022-10-01 01:59:16','2022-09-08 05:37:40'),(7,'notTheKing@gmail.com','nottheking','$2a$10$qaWtFWBAk/3zCiKzXPkUWOzjUlXFOhJvGEWUGOACYD1cWsLinoQbO',NULL,NULL,'nottheking','en',2,0,1,0,1,1,'2022-09-10 00:24:17','2022-09-10 00:24:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'image_archive'
--

--
-- Dumping routines for database 'image_archive'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-14 12:43:49

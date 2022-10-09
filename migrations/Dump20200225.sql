CREATE DATABASE  IF NOT EXISTS `image_archive_vdc_v1` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `image_archive_vdc_v1`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: image_archive_vdc_v1
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `path` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `mimetype` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `extension` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `size` float DEFAULT '0',
  `height` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  `displayRotate` float DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `activated` tinyint(1) DEFAULT '1',
  `removed` tinyint(1) DEFAULT '0',
  `categoryId` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset_id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assettag`
--

DROP TABLE IF EXISTS `assettag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assettag` (
  `assetId` bigint(20) NOT NULL,
  `tagId` bigint(20) NOT NULL,
  PRIMARY KEY (`assetId`,`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assettag`
--

LOCK TABLES `assettag` WRITE;
/*!40000 ALTER TABLE `assettag` DISABLE KEYS */;
/*!40000 ALTER TABLE `assettag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `parent` bigint(20) DEFAULT NULL COMMENT 'the category content it',
  `timeline` tinyint(1) DEFAULT '1' COMMENT '0: created by user; 1: automatically created by using current time - dd-mm-yyyy',
  `root` tinyint(1) DEFAULT '0' COMMENT '0: not root, 1: root - highest category',
  `activated` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) DEFAULT '0',
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dictionary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(64) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `language` char(2) DEFAULT 'ko',
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictionary`
--

LOCK TABLES `dictionary` WRITE;
/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(32) COLLATE utf8_bin DEFAULT 'R' COMMENT 'CRUD: C: create; R: Read; U: Update; D: Delete',
  `warn` tinyint(1) DEFAULT '0' COMMENT '0: normal; 1: warn; 2: serious; 3: emergent',
  `desc` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `assetId` bigint(20) DEFAULT NULL,
  `settingId` bigint(20) DEFAULT NULL,
  `categoryId` bigint(20) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metadata`
--

DROP TABLE IF EXISTS `metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metadata` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assetId` bigint(20) NOT NULL,
  `title` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `desc` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `exifVersion` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `maker` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `cameraModel` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `orientation` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `exposureTime` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `fNumber` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `exposureProgram` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `iso` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `createDate` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `components` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `shutterSpeed` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `aperture` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `flash` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `focusLens` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `userComment` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `colorSpace` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `compression` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `gamma` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `whiteBalance` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `exposure_mode` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `imageWidth` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `imageHeight` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `audioCodec` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `audioBitrate` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `audioChannels` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `videoCodec` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `videoBitrate` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `videoResolution` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `frameRate` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `duration` int(11) DEFAULT '0',
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `int_UNIQUE` (`id`),
  KEY `fk_asset_id_idx` (`assetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metadata`
--

LOCK TABLES `metadata` WRITE;
/*!40000 ALTER TABLE `metadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `value` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `hint` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT 'a short description to support to display on hint or ',
  `shortDesc` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `desc` text COLLATE utf8_bin,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `color` varchar(16) COLLATE utf8_bin DEFAULT '#FFFFFFFF' COMMENT 'format: #RRGGBBAA',
  `title` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `activated` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ui`
--

DROP TABLE IF EXISTS `ui`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ui` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `page` tinyint(1) unsigned DEFAULT '1' COMMENT 'page code in front-end',
  `dictionaryId` bigint(20) DEFAULT NULL,
  `type` tinyint(1) unsigned DEFAULT '1' COMMENT '1: web content; 2: message title; 3: message content; 4: email',
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ui`
--

LOCK TABLES `ui` WRITE;
/*!40000 ALTER TABLE `ui` DISABLE KEYS */;
/*!40000 ALTER TABLE `ui` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) COLLATE utf8_bin NOT NULL,
  `loginName` varchar(64) COLLATE utf8_bin NOT NULL,
  `password` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `firstName` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `lastName` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `displayName` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `language` char(2) COLLATE utf8_bin DEFAULT 'ko' COMMENT '2 characters, and follow the contry code: ko, vi, ...',
  `type` tinyint(1) DEFAULT '0' COMMENT 'value: 1 - anonymous, 2 - normal user, 3 - moderator, 4 - admin, 5- super admin',
  `system` tinyint(1) DEFAULT '0' COMMENT 'forever user, noone can delete or deactivate these user, 0: none system, 1: system',
  `activated` tinyint(1) DEFAULT '0' COMMENT '0: none activated; 1: activated',
  `deleted` tinyint(1) DEFAULT '0',
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `loginName_UNIQUE` (`loginName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ilovebioz@gmail.com','bioz','$2a$10$Q3llO06jGHgGO3.gpsoYJ.HkinyP92xmV0SFWTyaYwGbxOo0XzEDe','Binh','Nguyen','Binh Nguyen','en',5,1,1,0,1,1,'2020-02-23 15:31:20','2020-02-23 15:31:20'),(2,'anonymous@gmail.com','anonymous','$2a$10$Q3llO06jGHgGO3.gpsoYJ.HkinyP92xmV0SFWTyaYwGbxOo0XzEDe','Anonymous','System','Anonymous','en',1,1,1,0,1,1,'2020-02-23 15:35:14','2020-02-23 15:35:14');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'image_archive_vdc_v1'
--

--
-- Dumping routines for database 'image_archive_vdc_v1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-25  0:15:46

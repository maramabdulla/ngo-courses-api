-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: ngos_courses
-- ------------------------------------------------------
-- Server version	5.7.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `description` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `start_date` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `location` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `trainer` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `number_of_seats` int(11) DEFAULT NULL,
  `id_ngo` int(11) DEFAULT NULL,
  `end_datel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (7,'javescript','add description for the course','7/8/2006','alzaraq','18',99,58,'undefined'),(9,' english','add description for the course','1/2/2006','almafraq','19',8,58,'1/2/2009'),(12,'css','add description for the course ','7/8/2000','amman','19',6,59,'7/8/2006'),(13,'scince','add description for the course  ','1/1/1995','almafraq','19',3,58,'1/1/2000'),(14,'Html','add description for the course','1/1/2000','amman','18',9,58,'1/1/2008'),(15,'css','add description for the course','5/8/2000','amman','19',8,58,'5/8/2009');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses_trainee`
--

DROP TABLE IF EXISTS `courses_trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses_trainee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_course` int(11) DEFAULT NULL,
  `id_trainee` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses_trainee`
--

LOCK TABLES `courses_trainee` WRITE;
/*!40000 ALTER TABLE `courses_trainee` DISABLE KEYS */;
INSERT INTO `courses_trainee` VALUES (1,14,1),(2,14,1);
/*!40000 ALTER TABLE `courses_trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngos`
--

DROP TABLE IF EXISTS `ngos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ngos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `logo` varchar(245) DEFAULT NULL,
  `email` varchar(245) DEFAULT NULL,
  `website` varchar(245) DEFAULT NULL,
  `password` varchar(245) DEFAULT NULL,
  `bio` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngos`
--

LOCK TABLES `ngos` WRITE;
/*!40000 ALTER TABLE `ngos` DISABLE KEYS */;
INSERT INTO `ngos` VALUES (58,'w',NULL,'w@w.w',NULL,'$2a$08$FJwsqZTttwufPkuvImYCVeHBTaLPy2SDbSNE9T5Sdd8dLnQFq6tAu',NULL),(59,'q',NULL,'q@q.q',NULL,'$2a$08$bUSupv2mnbHu4MrwbuaS1Ol.xR2e9HAcfX3/F4F7TGfTHB4zpr3yy',NULL),(60,'t',NULL,'t@t.t',NULL,'$2a$08$EG/4bIMqdDQrlpZuy3qWlucjqwuHopVPXe4YBjzqTjfgT1lsC7HUa',NULL),(61,'m',NULL,'m@m.m',NULL,'$2a$08$qsTG7tXlCgw.cE5PGW5JM.J4tCGXhE6JAuX8shF.6IjJxqJgekqY6',NULL);
/*!40000 ALTER TABLE `ngos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainee`
--

DROP TABLE IF EXISTS `trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `address` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee`
--

LOCK TABLES `trainee` WRITE;
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` VALUES (1,'ahmad','234','45','ewrt','435ewqrt'),(2,'alia',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `picture` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `mobile` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `address` varchar(245) CHARACTER SET latin1 DEFAULT NULL,
  `short_bio` text CHARACTER SET latin1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (17,'14141','14141','14141','14141','14141','124132'),(18,'maram',NULL,NULL,NULL,NULL,NULL),(19,'ali',NULL,NULL,NULL,NULL,NULL),(20,'alia',NULL,NULL,NULL,NULL,NULL),(21,'sssssssss ','/imeges/trainers/sssssssssss@yahoo.com1112213135.png ','sssssssssss@yahoo.com ','1112213135 ','','Tell us about you as a Trainer: Your Background, Qualifications, Skills and Experience. \n                 ');
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-23  1:24:44

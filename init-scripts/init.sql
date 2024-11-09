CREATE DATABASE  IF NOT EXISTS `sysvol` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- Create a new user with a password
CREATE USER IF NOT EXISTS 'volqueteshermanos'@'%' IDENTIFIED BY 'volqueteshermanos';

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON sysvol.* TO 'volqueteshermanos'@'%';
ALTER USER 'root'@'%' IDENTIFIED BY '12345';

-- Flush privileges to ensure that the changes take effect
FLUSH PRIVILEGES;



USE `sysvol`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)

-- Host: 127.0.0.1    Database: sysvol
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `ALQUILER`
-- 

DROP TABLE IF EXISTS `ALQUILER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ALQUILER` (
  `nro_volquete` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date DEFAULT NULL,
  `fecha_hr_entrega` datetime DEFAULT NULL,
  `fecha_hr_retiro` datetime DEFAULT NULL,
  `estado_alquiler` varchar(20) DEFAULT NULL,
  `nroFactura` int DEFAULT NULL,
  PRIMARY KEY (`nro_volquete`,`id_cliente`,`fecha_desde`),
  KEY `id_cliente` (`id_cliente`),
  KEY `nroFactura` (`nroFactura`),
  CONSTRAINT `ALQUILER_ibfk_1` FOREIGN KEY (`nro_volquete`) REFERENCES `VOLQUETE` (`nro_volquete`),
  CONSTRAINT `ALQUILER_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTE` (`id_cliente`),
  CONSTRAINT `ALQUILER_ibfk_3` FOREIGN KEY (`nroFactura`) REFERENCES `FACTURA` (`nro_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ALQUILER`
--

LOCK TABLES `ALQUILER` WRITE;
/*!40000 ALTER TABLE `ALQUILER` DISABLE KEYS */;
/*!40000 ALTER TABLE `ALQUILER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CLIENTE`
--

DROP TABLE IF EXISTS `CLIENTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLIENTE` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CLIENTE`
--

LOCK TABLES `CLIENTE` WRITE;
/*!40000 ALTER TABLE `CLIENTE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CLIENTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COSTO_VOLQUETE`
--

DROP TABLE IF EXISTS `COSTO_VOLQUETE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COSTO_VOLQUETE` (
  `id_tipo_volquete` int NOT NULL,
  `fecha_hr_desde` datetime NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_tipo_volquete`,`fecha_hr_desde`),
  CONSTRAINT `COSTO_VOLQUETE_ibfk_1` FOREIGN KEY (`id_tipo_volquete`) REFERENCES `TIPO_VOLQUETE` (`id_tipo_volquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COSTO_VOLQUETE`
--

LOCK TABLES `COSTO_VOLQUETE` WRITE;
/*!40000 ALTER TABLE `COSTO_VOLQUETE` DISABLE KEYS */;
/*!40000 ALTER TABLE `COSTO_VOLQUETE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EMPRESA`
--

DROP TABLE IF EXISTS `EMPRESA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EMPRESA` (
  `cuit` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `foto` blob,
  PRIMARY KEY (`cuit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPRESA`
--

LOCK TABLES `EMPRESA` WRITE;
/*!40000 ALTER TABLE `EMPRESA` DISABLE KEYS */;
/*!40000 ALTER TABLE `EMPRESA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FACTURA`
--

DROP TABLE IF EXISTS `FACTURA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FACTURA` (
  `nro_factura` int NOT NULL AUTO_INCREMENT,
  `tipo_factura` varchar(10) NOT NULL,
  `fecha_emision` date NOT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `monto_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`nro_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FACTURA`
--

LOCK TABLES `FACTURA` WRITE;
/*!40000 ALTER TABLE `FACTURA` DISABLE KEYS */;
/*!40000 ALTER TABLE `FACTURA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GASTO`
--

DROP TABLE IF EXISTS `GASTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GASTO` (
  `fecha_hr_gasto` datetime NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  PRIMARY KEY (`fecha_hr_gasto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GASTO`
--

LOCK TABLES `GASTO` WRITE;
/*!40000 ALTER TABLE `GASTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `GASTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAGO`
--

DROP TABLE IF EXISTS `PAGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAGO` (
  `nro_volquete` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hr_pago` datetime NOT NULL,
  `nro_factura` int NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `cod_transferencia` varchar(50) DEFAULT NULL,
  `cuentaReceptora` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nro_volquete`,`id_cliente`,`fecha_desde`,`fecha_hr_pago`),
  KEY `nro_factura` (`nro_factura`),
  CONSTRAINT `PAGO_ibfk_1` FOREIGN KEY (`nro_volquete`, `id_cliente`, `fecha_desde`) REFERENCES `ALQUILER` (`nro_volquete`, `id_cliente`, `fecha_desde`),
  CONSTRAINT `PAGO_ibfk_2` FOREIGN KEY (`nro_factura`) REFERENCES `FACTURA` (`nro_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAGO`
--

LOCK TABLES `PAGO` WRITE;
/*!40000 ALTER TABLE `PAGO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PAGO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POLITICA_ALERTAS`
--

DROP TABLE IF EXISTS `POLITICA_ALERTAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POLITICA_ALERTAS` (
  `fecha_desde_vigencia` date NOT NULL,
  `nroDiasEstadiaAlerta` int NOT NULL,
  PRIMARY KEY (`fecha_desde_vigencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POLITICA_ALERTAS`
--

LOCK TABLES `POLITICA_ALERTAS` WRITE;
/*!40000 ALTER TABLE `POLITICA_ALERTAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `POLITICA_ALERTAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPO_VOLQUETE`
--

DROP TABLE IF EXISTS `TIPO_VOLQUETE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIPO_VOLQUETE` (
  `id_tipo_volquete` int NOT NULL AUTO_INCREMENT,
  `descripcion_tipo_volquete` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_volquete`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPO_VOLQUETE`
--

LOCK TABLES `TIPO_VOLQUETE` WRITE;
/*!40000 ALTER TABLE `TIPO_VOLQUETE` DISABLE KEYS */;
INSERT INTO `TIPO_VOLQUETE` VALUES (1,'Chico'),(2,'Medio'),(3,'Grande'),(4,'EXTRA CHICO');
/*!40000 ALTER TABLE `TIPO_VOLQUETE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VOLQUETE`
--

DROP TABLE IF EXISTS `VOLQUETE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VOLQUETE` (
  `nro_volquete` int NOT NULL AUTO_INCREMENT,
  `id_tipo_volquete` int NOT NULL,
  `fecha_compra` date DEFAULT NULL,
  `fecha_fabricacion` date DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nro_volquete`),
  KEY `id_tipo_volquete` (`id_tipo_volquete`),
  CONSTRAINT `VOLQUETE_ibfk_1` FOREIGN KEY (`id_tipo_volquete`) REFERENCES `TIPO_VOLQUETE` (`id_tipo_volquete`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VOLQUETE`
--

LOCK TABLES `VOLQUETE` WRITE;
/*!40000 ALTER TABLE `VOLQUETE` DISABLE KEYS */;
INSERT INTO `VOLQUETE` VALUES (1,1,'2024-08-03','2024-06-20','Caterpillar'),(2,1,'2024-08-03','2024-05-20','Volvo'),(3,2,'2024-08-03','2024-04-20','Komatsu'),(4,3,'2024-08-03','2024-03-12','Hitachi'),(5,2,'2024-08-03','2024-07-31','Camiones Mack');
/*!40000 ALTER TABLE `VOLQUETE` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 12:11:12

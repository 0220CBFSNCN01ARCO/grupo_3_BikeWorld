-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ecommercedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecommercedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommercedb` DEFAULT CHARACTER SET utf8mb4 ;
USE `ecommercedb` ;

-- -----------------------------------------------------
-- Table `ecommercedb`.`categoriaproductos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`categoriaproductos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`categoriausuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`categoriausuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`statusproducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`statusproducto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`productos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NULL DEFAULT NULL,
  `precio` DOUBLE NULL DEFAULT NULL,
  `descuento` DOUBLE NULL DEFAULT NULL,
  `categoriaProducto_id` INT(11) NULL DEFAULT NULL,
  `descripcion` VARCHAR(400) NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  `status_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `CategoriaProducto_fk` (`categoriaProducto_id` ASC),
  INDEX `status_fk` (`status_id` ASC),
  CONSTRAINT `CategoriaProducto_fk`
    FOREIGN KEY (`categoriaProducto_id`)
    REFERENCES `ecommercedb`.`categoriaproductos` (`id`),
  CONSTRAINT `status_fk`
    FOREIGN KEY (`status_id`)
    REFERENCES `ecommercedb`.`statusproducto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  `apellido` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `categoriaUsuario_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `CategoriaUsuario_fk` (`categoriaUsuario_id` ASC),
  CONSTRAINT `CategoriaUsuario_fk`
    FOREIGN KEY (`categoriaUsuario_id`)
    REFERENCES `ecommercedb`.`categoriausuarios` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Tabla de usuarios del eCommerce';


-- -----------------------------------------------------
-- Table `ecommercedb`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`ventas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL DEFAULT NULL,
  `usuario_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `Usuario_fk` (`usuario_id` ASC),
  CONSTRAINT `Usuario_fk`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ecommercedb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`ventadetalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`ventadetalles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `venta_id` INT(11) NULL DEFAULT NULL,
  `producto_id` INT(11) NULL DEFAULT NULL,
  `cantidad` DOUBLE NULL DEFAULT NULL,
  `precio` DOUBLE NULL DEFAULT NULL,
  `descuento` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `venta_fk` (`venta_id` ASC),
  INDEX `producto_fk` (`producto_id` ASC),
  CONSTRAINT `producto_fk`
    FOREIGN KEY (`producto_id`)
    REFERENCES `ecommercedb`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `venta_fk`
    FOREIGN KEY (`venta_id`)
    REFERENCES `ecommercedb`.`ventas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecommercedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommercedb` DEFAULT CHARACTER SET utf8mb4 ;
USE `ecommercedb` ;

-- -----------------------------------------------------
-- Table `ecommercedb`.`ProductCategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`ProductCategories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`UserCategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`UserCategories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`ProductStates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`ProductStates` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`Products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `discount` DOUBLE NULL DEFAULT NULL,
  `productCategoryId` INT(11) NULL DEFAULT NULL,
  `description` VARCHAR(400) NULL DEFAULT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `productStatusId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `productCategoryFk` (`productCategoryId` ASC),
  INDEX `productStatusFk` (`productStatusId` ASC),
  CONSTRAINT `productCategoryFk`
    FOREIGN KEY (`productCategoryId`)
    REFERENCES `ecommercedb`.`ProductCategories` (`id`),
  CONSTRAINT `productStatusFk`
    FOREIGN KEY (`productStatusId`)
    REFERENCES `ecommercedb`.`ProductStates` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`Users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NULL DEFAULT NULL,
  `lastName` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `userCategoryId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userCategoryFk` (`userCategoryId` ASC),
  CONSTRAINT `userCategoryFk`
    FOREIGN KEY (`userCategoryId`)
    REFERENCES `ecommercedb`.`UserCategories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = 'Tabla de usuarios del eCommerce';


-- -----------------------------------------------------
-- Table `ecommercedb`.`Sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`Sales` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userFk` (`userId` ASC),
  CONSTRAINT `userFk`
    FOREIGN KEY (`userId`)
    REFERENCES `ecommercedb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `ecommercedb`.`SalesDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`SalesDetails` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `saleId` INT(11) NULL DEFAULT NULL,
  `productId` INT(11) NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `discount` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `saleFk` (`saleId` ASC),
  INDEX `productFk` (`productId` ASC),
  CONSTRAINT `productFk`
    FOREIGN KEY (`productId`)
    REFERENCES `ecommercedb`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `saleFk`
    FOREIGN KEY (`saleId`)
    REFERENCES `ecommercedb`.`Sales` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `ecommercedb`.`Car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`Carts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userFk` (`userId` ASC),
  CONSTRAINT `userFk`
    FOREIGN KEY (`userIdCarts`)
    REFERENCES `ecommercedb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `ecommercedb`.`CarDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommercedb`.`CartDetails` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cartId` INT(11) NULL DEFAULT NULL,
  `productId` INT(11) NULL DEFAULT NULL,
  `amount` DOUBLE NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `discount` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `cartFk` (`cartId` ASC),
  INDEX `productFk` (`productId` ASC),
  CONSTRAINT `productFk`
    FOREIGN KEY (`productCarId`)
    REFERENCES `ecommercedb`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cartFk`
    FOREIGN KEY (`cartId`)
    REFERENCES `ecommercedb`.`Cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

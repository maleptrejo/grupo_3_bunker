-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bunker_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bunker_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bunker_db` DEFAULT CHARACTER SET utf8 ;
USE `bunker_db` ;

-- -----------------------------------------------------
-- Table `bunker_db`.`discounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`discounts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `level` DOUBLE(3,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `level_UNIQUE` (`level` ASC));


-- -----------------------------------------------------
-- Table `bunker_db`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`brands` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
`created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));


-- -----------------------------------------------------
-- Table `bunker_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));


-- -----------------------------------------------------
-- Table `bunker_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`products` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  `price` FLOAT(12,2) UNSIGNED NOT NULL,
  `description` TEXT NULL,
  `brand_id` BIGINT UNSIGNED NOT NULL,
  `discount_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `discount_idx` (`discount_id` ASC),
  INDEX `brand_idx` (`brand_id` ASC),
  INDEX `category_idx` (`category_id` ASC),
  CONSTRAINT `discount`
    FOREIGN KEY (`discount_id`)
    REFERENCES `bunker_db`.`discounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `bunker_db`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category`
    FOREIGN KEY (`category_id`)
    REFERENCES `bunker_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunker_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));


-- -----------------------------------------------------
-- Table `bunker_db`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`cart` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
`created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `purchased_at` TIMESTAMP NULL,
  `user_id` BIGINT UNSIGNED NULL,
  `total` FLOAT(12,2) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `cart_belongs_to_user_idx` (`user_id` ASC),
  CONSTRAINT `cart_belongs_to_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunker_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunker_db`.`cart_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`cart_product` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `price` FLOAT(12,2) UNSIGNED NOT NULL,
  `quantity` SMALLINT UNSIGNED NULL DEFAULT 1,
  `cart_id` BIGINT UNSIGNED NULL,
  `product_id` BIGINT UNSIGNED NULL,
  `subtotal` FLOAT(12,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_belongs_to_cart_idx` (`product_id` ASC),
  INDEX `cart_has_products_idx` (`cart_id` ASC),
  CONSTRAINT `product_belongs_to_cart`
    FOREIGN KEY (`product_id`)
    REFERENCES `bunker_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart_has_products`
    FOREIGN KEY (`cart_id`)
    REFERENCES `bunker_db`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunker_db`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`customers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
`created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  `surname` VARCHAR(100) NOT NULL,
  `adress` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `customer_is_an_user_idx` (`user_id` ASC),
  CONSTRAINT `customer_is_an_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunker_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunker_db`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunker_db`.`admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NOT NULL,
  `sname` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `admin_is_an_user_idx` (`user_id` ASC),
  CONSTRAINT `admin_is_an_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunker_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bunkerDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bunkerDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bunkerDB` DEFAULT CHARACTER SET utf8 ;
USE `bunkerDB` ;

-- -----------------------------------------------------
-- Table `bunkerDB`.`discounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`discounts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `level` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `level_UNIQUE` (`level` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bunkerDB`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`brands` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bunkerDB`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bunkerDB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`products` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NOT NULL,
  `price` FLOAT(12,2) UNSIGNED NOT NULL,
  `description` TEXT NULL,
  `brand_id` BIGINT UNSIGNED NOT NULL,
  `discount_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `discount_idx` (`discount_id` ASC) VISIBLE,
  INDEX `brand_idx` (`brand_id` ASC) VISIBLE,
  INDEX `category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `discount`
    FOREIGN KEY (`discount_id`)
    REFERENCES `bunkerDB`.`discounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `bunkerDB`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category`
    FOREIGN KEY (`category_id`)
    REFERENCES `bunkerDB`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunkerDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bunkerDB`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`cart` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP NOT NULL,
  `purchased_at` TIMESTAMP NULL,
  `user_id` BIGINT UNSIGNED NULL,
  `total` FLOAT(12,2) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `cart_belongs_to_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `cart_belongs_to_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunkerDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunkerDB`.`cart_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`cart_product` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP NOT NULL,
  `quantity` SMALLINT UNSIGNED NULL DEFAULT 1,
  `cart_id` BIGINT UNSIGNED NULL,
  `product_id` BIGINT UNSIGNED NULL,
  `price` FLOAT(12,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_belongs_to_cart_idx` (`product_id` ASC) VISIBLE,
  INDEX `cart_has_products_idx` (`cart_id` ASC) VISIBLE,
  CONSTRAINT `product_belongs_to_cart`
    FOREIGN KEY (`product_id`)
    REFERENCES `bunkerDB`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart_has_products`
    FOREIGN KEY (`cart_id`)
    REFERENCES `bunkerDB`.`cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunkerDB`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`customers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `surname` VARCHAR(100) NOT NULL,
  `adress` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `customer_is_an_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `customer_is_an_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunkerDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `bunkerDB`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bunkerDB`.`admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `sname` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `admin_is_an_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `admin_is_an_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bunkerDB`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

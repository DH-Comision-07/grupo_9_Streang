USE streang;

CREATE TABLE IF NOT EXISTS `streang`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `video` VARCHAR(45) NULL,
  `price` INT NOT NULL,
  `available` TINYINT NULL,
  `main_image` VARCHAR(45) NULL,
  more_images_1 VARCHAR(45) NULL,
  more_images_2 VARCHAR(45) NULL,
  more_images_3 VARCHAR(45) NULL,
  banner_image VARCHAR(45) NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(45) NULL,
  `stock` INT NULL,
  `platform_id` INT NULL,
  `format_id` INT NULL,
  `discount` INT NULL,
  final_price INT NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE IF NOT EXISTS `streang`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(45) NOT NULL,
  `rol_id` VARCHAR(45) NOT NULL,
  `birthdate` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC));

  create table IF NOT EXISTS contact(
id INT auto_increment,
name VARCHAR(40) NOT NULL,
email VARCHAR(70) NOT NULL,
subject VARCHAR(70),
message TEXT NOT NULL,
primary key(id)
);

CREATE TABLE IF NOT EXISTS comments(
id INT AUTO_INCREMENT,
product_id INT NOT NULL,
user VARCHAR(45) NOT NULL, 
comment TEXT NOT NULL,
date DATE NOT NULL,
avatar VARCHAR(45) NOT NULL, 
PRIMARY KEY (id)
);
  
  CREATE TABLE IF NOT EXISTS `streang`.`platforms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE IF NOT EXISTS `streang`.`formats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS streang.rols (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS streang.categories(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS `streang`.`buys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `buyscol` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE IF NOT EXISTS `streang`.`products_buys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `buy_id` INT NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE IF NOT EXISTS streang.products_platforms(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  platform_id INT NOT NULL,
  PRIMARY KEY (id));
  
-- AGREGAR FK
ALTER TABLE `streang`.`products` 
ADD INDEX `category_id_idx` (`category_id` ASC),
ADD INDEX `platforms_id_idx` (`platform_id` ASC),
ADD INDEX `format_id_idx` (`format_id` ASC);
;
ALTER TABLE `streang`.`products` 
ADD CONSTRAINT `category_id`
  FOREIGN KEY (`category_id`)
  REFERENCES `streang`.`categories` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `platforms_id`
  FOREIGN KEY (`platform_id`)
  REFERENCES `streang`.`platforms` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `format_id`
  FOREIGN KEY (`format_id`)
  REFERENCES `streang`.`formats` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `streang`.`users` 
ADD INDEX `rol_id_idx` (`rol_id` ASC);
;
ALTER TABLE `streang`.`users` 
ADD CONSTRAINT `rol_id`
  FOREIGN KEY (`rol_id`)
  REFERENCES `streang`.`rols` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `streang`.`products_buys` 
ADD INDEX `product_id_idx` (`product_id` ASC),
ADD INDEX `buy_id_idx` (`buy_id` ASC);
;
ALTER TABLE `streang`.`products_buys` 
ADD CONSTRAINT `product_id`
  FOREIGN KEY (`product_id`)
  REFERENCES `streang`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `buy_id`
  FOREIGN KEY (`buy_id`)
  REFERENCES `streang`.`buys` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `streang`.`products_platforms` 
ADD CONSTRAINT `fk_product_id`
  FOREIGN KEY (`product_id`)
  REFERENCES `streang`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `platform_id`
  FOREIGN KEY (`platform_id`)
  REFERENCES `streang`.`platforms` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE `streang`.`buys` 
ADD INDEX `user_id_idx` (`user_id` ASC),
ADD INDEX `product_buy_id_idx` (`product_id` ASC);
;
ALTER TABLE `streang`.`buys` 
ADD CONSTRAINT `user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `streang`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `product_buy_id`
  FOREIGN KEY (`product_id`)
  REFERENCES `streang`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  
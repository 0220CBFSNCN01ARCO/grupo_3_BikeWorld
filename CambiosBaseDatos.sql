USE ecommercedb;

-- Creación de campos
-- ---------------------------------------------------
ALTER TABLE Users ADD userAdmin TINYINT(1);
ALTER TABLE Sales ADD sale TINYINT(1);

-- Eliminación de campos y clave foranea
-- ---------------------------------------------------
ALTER TABLE Users DROP FOREIGN KEY userCategoryFk;
ALTER TABLE Users DROP userCategoryId;

-- Eliminación de tablas usadas en carrito
-- ---------------------------------------------------
DROP TABLE IF EXISTS CartDetails;
DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS UserCategories;

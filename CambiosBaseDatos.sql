USE ecommercedb;

-- Creación de campos
-- ---------------------------------------------------
ALTER TABLE users ADD useradmin TINYINT(1);
ALTER TABLE sales ADD sale TINYINT(1);

-- Eliminación de campos y clave foranea
-- ---------------------------------------------------
ALTER TABLE users DROP FOREIGN KEY userCategoryFk;
ALTER TABLE users DROP userCategoryId;

-- Eliminación de tablas usadas en carrito 
-- ---------------------------------------------------
DROP TABLE IF EXISTS cartdetails;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS usercategories;


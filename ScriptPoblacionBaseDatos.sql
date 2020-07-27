USE `ecommercedb`;

INSERT INTO `ProductCategories` (`name`) VALUES ('Accesorios');
INSERT INTO `ProductCategories` (`name`) VALUES ('Transmisión');
INSERT INTO `ProductCategories` (`name`) VALUES ('Frenos');
INSERT INTO `ProductCategories` (`name`) VALUES ('Bicicletas');

INSERT INTO `ProductStates` (`name`) VALUES ('Oferta');
INSERT INTO `ProductStates` (`name`) VALUES ('Destacado');

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Casco',
    1576,
    0,
    1,
    'Casco para uso recreativo ajustable.',
    'image-1592795275916.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Medidor de cadena',
    356,
    0,
    1,
    'Medidor de desgaste de cadena en 1 y 0.75.',
    'image-1592795357323.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Piñón 12 velocidades',
    3245,
    0,
    2,
    'Piñón de 12 velocidades 11 / 46, cuerpo de aluminio, ligero en peso.',
    'image-1592795451650.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Shifters integrados',
    2356,
    0,
    2,
    'Shifters integrados con manijas de frenos mecánicos.',
    'image-1592795528519.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Tornillos de frenos',
    745,
    0,
    3,
    'Tornillos para frenos a discos anodizados cobre.',
    'image-1592795594726.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Venzo Skyline 27 v',
    38791,
    0,
    4,
    'Venzo Skyline de 27 velocidades, frenos hidráulicos y suspensión a elastómeros.',
    'image-1592795665963.jpg',
    2
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Bici doble suspensión',
    19671,
    10,
    4,
    'Bicicleta doble suspensión de 24 velocidades con frenos mecánicos.',
    'image-1592795758240.jpg',
    1
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Cadena 10v',
    1436,
    15,
    2,
    'Cadena de 10 velocidades.',
    'image-1592795831569.jpg',
    1
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Caliper Freno',
    1108,
    10,
    3,
    'Caliper para freno mecánico con pastillas.',
    'image-1592795876619.jpg',
    1
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Lubricante 110cc',
    258,
    5,
    1,
    'Lubricante para ambientes secos',
    'image-1592795917954.jpg',
    1
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Tapa rayos',
    509,
    5,
    1,
    'Tapa rayos, cuida no se ensucie el disco de freno.',
    'image-1592795951528.jpg',
    1
  );

INSERT INTO `Products` (
    `name`,
    `price`,
    `discount`,
    `productCategoryId`,
    `description`,
    `image`,
    `productStatusId`
  )
VALUES (
    'Venzo Eolo',
    45000,
    10,
    4,
    'Bicicleta de 24 velocidades con frenos a discos mecánicos.',
    'image-1592795991608.jpg',
    1
  );

INSERT INTO `UserCategories` (`name`) VALUES ('User');
INSERT INTO `UserCategories` (`name`) VALUES ('Admin');

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Alberto',
    'Einstein',
    'albertoe@gmail.com',
    'HsdCjF31',
    2,
    'user_1.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Berna',
    'Goldstein',
    'bgoldstein1@msn.com',
    'uHbaG9Epls',
    1,
    'user_2.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Petronella',
    'Gherardesci',
    'pgherardesci2@sciencedirect.com',
    'hvLky3XRY',
    1,
    'user_3.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Farleigh',
    'Lupson',
    'flupson3@fc2.com',
    'RSJiKSIb',
    1,
    'user_4.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Slade',
    'Bartlam',
    'sbartlam4@usgs.gov',
    'Z1ETOE',
    1,
    'user_5.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Nestor',
    'Dexter',
    'ndexter5@wordpress.org',
    'h9RhjDNP',
    1,
    'user_6.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Livvy',
    'Bartaletti',
    'lbartaletti6@google.com.au',
    'D3DEZK5vsDT',
    1,
    'user_7.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Ola',
    'Kropp',
    'okropp7@opensource.org',
    'gaklW0vL',
    1,
    'user_8.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Shelley',
    'Lark',
    'slark8@walmart.com',
    'm6EQRZ',
    1,
    'user_9.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Katheryn',
    'Cockshott',
    'kcockshott9@people.com.cn',
    'HCBhhnCWA',
    1,
    'user_10.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Jozef',
    'Tingley',
    'jtingleya@bing.com',
    'XQSUTuBF',
    1,
    'user_11.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Gray',
    'Gouldeby',
    'ggouldebyb@noaa.gov',
    'vDfGtCt',
    1,
    'user_12.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Shara',
    'Spearman',
    'sspearmanc@vistaprint.com',
    'ntl2Fk4tI',
    1,
    'user_13.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Wildon',
    'Stanes',
    'wstanesd@lycos.com',
    'WJAMySvPj50',
    1,
    'user_14.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Dareen',
    'Kellie',
    'dkelliee@illinois.edu',
    '5M1iFXGtE',
    1,
    'user_15.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Rog',
    'Ruperti',
    'rrupertif@typepad.com',
    'eJad0RVG3',
    1,
    'user_16.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Georgette',
    'Wilder',
    'gwilderg@mozilla.org',
    'YKhvdHBYrR',
    1,
    'user_17.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Laurence',
    'McGeechan',
    'lmcgeechanh@alibaba.com',
    'ZtFnfYKySve8',
    1,
    'user_18.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Hoyt',
    'Emanuele',
    'hemanuelei@yahoo.co.jp',
    '01PVbfiQ',
    1,
    'user_19.jpg'
  );

INSERT INTO `Users`(
    `firstName`,
    `lastName`,
    `email`,
    `password`,
    `userCategoryId`,
    `image`
  )
VALUES (
    'Dyann',
    'Dellacasa',
    'ddellacasaj@walmart.com',
    'No4fooM',
    1,
    'user_20.jpg'
  );

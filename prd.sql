-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

\connect "prd";

DROP TABLE IF EXISTS "about";
DROP SEQUENCE IF EXISTS about_id_seq;
CREATE SEQUENCE about_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."about" (
    "id" integer DEFAULT nextval('about_id_seq') NOT NULL,
    "phone" character varying,
    "openTime" character varying,
    "email" character varying,
    "fb" character varying,
    "instagram" character varying,
    "shopee" character varying,
    "tiki" character varying,
    "tiktok" character varying,
    "logo" character varying,
    "banners" character varying,
    "description" text,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "about";

DROP TABLE IF EXISTS "address";
DROP SEQUENCE IF EXISTS address_id_seq;
CREATE SEQUENCE address_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."address" (
    "id" integer DEFAULT nextval('address_id_seq') NOT NULL,
    "unit_number" character varying,
    "stress_number" character varying,
    "address_line_1" character varying,
    "address_line_2" character varying,
    "city" character varying,
    "postal_code" character varying,
    "countryId" integer,
    CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"),
    CONSTRAINT "REL_d87215343c3a3a67e6a0b7f3ea" UNIQUE ("countryId")
) WITH (oids = false);

TRUNCATE "address";
INSERT INTO "address" ("id", "unit_number", "stress_number", "address_line_1", "address_line_2", "city", "postal_code", "countryId") VALUES
(1,	'vnd',	'',	'Quoc Tuan - An Lao - Hai Phong',	NULL,	'Hai Phong',	'180000',	1);

DROP TABLE IF EXISTS "country";
DROP SEQUENCE IF EXISTS country_id_seq;
CREATE SEQUENCE country_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."country" (
    "id" integer DEFAULT nextval('country_id_seq') NOT NULL,
    "code" character varying NOT NULL,
    "country_name" character varying NOT NULL,
    CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "country";
INSERT INTO "country" ("id", "code", "country_name") VALUES
(1,	'1',	'Vietnam');

DROP TABLE IF EXISTS "order_line";
DROP SEQUENCE IF EXISTS order_line_id_seq;
CREATE SEQUENCE order_line_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."order_line" (
    "id" integer DEFAULT nextval('order_line_id_seq') NOT NULL,
    "qty" integer NOT NULL,
    "price" integer NOT NULL,
    "productItemId" integer,
    "orderId" integer,
    CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "order_line";
INSERT INTO "order_line" ("id", "qty", "price", "productItemId", "orderId") VALUES
(15,	2,	500,	1,	30),
(16,	5,	201,	2,	30);

DROP TABLE IF EXISTS "order_status";
DROP SEQUENCE IF EXISTS order_status_id_seq;
CREATE SEQUENCE order_status_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."order_status" (
    "id" integer DEFAULT nextval('order_status_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "order_status";
INSERT INTO "order_status" ("id", "name") VALUES
(1,	'Cancel'),
(2,	'delivery'),
(3,	'success');

DROP TABLE IF EXISTS "payment_type";
DROP SEQUENCE IF EXISTS payment_type_id_seq;
CREATE SEQUENCE payment_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."payment_type" (
    "id" integer DEFAULT nextval('payment_type_id_seq') NOT NULL,
    "type" character varying NOT NULL,
    CONSTRAINT "PK_4f301e328eaf2127773c889ab94" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "payment_type";
INSERT INTO "payment_type" ("id", "type") VALUES
(1,	'CK'),
(2,	'online'),
(3,	'COD');

DROP TABLE IF EXISTS "post";
DROP SEQUENCE IF EXISTS post_id_seq;
CREATE SEQUENCE post_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."post" (
    "id" integer DEFAULT nextval('post_id_seq') NOT NULL,
    "title" character varying NOT NULL,
    "subtitle" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "thumb" character varying,
    "content" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "authorId" integer,
    CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "post";
INSERT INTO "post" ("id", "title", "subtitle", "slug", "thumb", "content", "created_at", "updated_at", "authorId") VALUES
(4,	'asfgds sdg fgrgwege',	'test-lorem',	'test-lorem',	'localhost:8001/thumb/1704702680292-344757172_9552161234801727_6898932391250555491_n.jpg',	'There are many variations of passages of Lorem Ipsum available',	'2024-01-08 08:31:20.320496',	'2024-01-08 08:31:20.320496',	1),
(5,	'asfgds sdg fgrgwege',	'test-lorem',	'test-lorem',	'localhost:8001/thumb/1704702682454-344757172_9552161234801727_6898932391250555491_n.jpg',	'There are many variations of passages of Lorem Ipsum available',	'2024-01-08 08:31:22.694291',	'2024-01-08 08:31:22.694291',	1),
(3,	'asfgds sdg fgrgwege',	'test-lorem',	'test-lorem',	'localhost:8001/thumb/1704180649031-344757172_9552161234801727_6898932391250555491_n.jpg',	'There are many variations of passages of Lorem Ipsum available',	'2024-01-02 07:30:49.04739',	'2024-01-02 07:30:49.04739',	1);

DROP TABLE IF EXISTS "product";
DROP SEQUENCE IF EXISTS product_id_seq;
CREATE SEQUENCE product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."product" (
    "id" integer DEFAULT nextval('product_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "description" character varying NOT NULL,
    "product_images" character varying NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "categoryId" integer,
    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "product";
INSERT INTO "product" ("id", "name", "description", "product_images", "created_at", "updated_at", "categoryId") VALUES
(1,	'test product - api (update)',	'descrion',	'/list-img-product.png',	'2024-01-08 08:23:31.232301',	'2024-01-10 08:45:53.66483',	2);

DROP TABLE IF EXISTS "product_category";
DROP SEQUENCE IF EXISTS product_category_id_seq;
CREATE SEQUENCE product_category_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."product_category" (
    "id" integer DEFAULT nextval('product_category_id_seq') NOT NULL,
    "parentCategoryId" integer,
    "category_name" character varying NOT NULL,
    "promotionsId" integer,
    CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "product_category";
INSERT INTO "product_category" ("id", "parentCategoryId", "category_name", "promotionsId") VALUES
(1,	NULL,	'category test',	1),
(2,	NULL,	'test2',	NULL),
(3,	NULL,	'T-shirt',	NULL),
(4,	NULL,	'Sơ mi',	NULL),
(5,	NULL,	'blader',	NULL);

DROP TABLE IF EXISTS "product_configuration";
DROP SEQUENCE IF EXISTS product_configuration_id_seq;
CREATE SEQUENCE product_configuration_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."product_configuration" (
    "id" integer DEFAULT nextval('product_configuration_id_seq') NOT NULL,
    "productItemId" integer,
    "variationOptionId" integer,
    CONSTRAINT "PK_234f05214d60c49e9a673bd7e2f" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "product_configuration";
INSERT INTO "product_configuration" ("id", "productItemId", "variationOptionId") VALUES
(3,	1,	1),
(7,	1,	1);

DROP TABLE IF EXISTS "product_item";
DROP SEQUENCE IF EXISTS product_item_id_seq;
CREATE SEQUENCE product_item_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."product_item" (
    "id" integer DEFAULT nextval('product_item_id_seq') NOT NULL,
    "sku" character varying NOT NULL,
    "product_images" character varying NOT NULL,
    "productId" integer,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "qty_in_stock" integer DEFAULT '0' NOT NULL,
    "price" integer DEFAULT '0' NOT NULL,
    CONSTRAINT "PK_83c3b7a80f6fe1d5ad7fa05a2a2" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "product_item";
INSERT INTO "product_item" ("id", "sku", "product_images", "productId", "created_at", "updated_at", "qty_in_stock", "price") VALUES
(1,	'TEST261',	'/product_img.png',	1,	'2024-01-10 09:39:45.144634',	'2024-01-10 09:39:45.144634',	120,	100),
(2,	'TEST_OTD',	'/1.png,2p.png',	1,	'2024-01-10 14:12:34.822729',	'2024-01-10 14:12:34.822729',	200,	150),
(3,	'TEST_OTD',	'/1.png,2p.png',	1,	'2024-01-10 14:16:58.73878',	'2024-01-10 14:16:58.73878',	200,	150),
(4,	'TEST_OTD dsfwec',	'/1.png,2p.png',	1,	'2024-01-10 14:25:25.926121',	'2024-01-10 14:25:25.926121',	200,	150);

DROP TABLE IF EXISTS "promotion";
DROP SEQUENCE IF EXISTS promotion_id_seq;
CREATE SEQUENCE promotion_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."promotion" (
    "id" integer DEFAULT nextval('promotion_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "description" character varying NOT NULL,
    "discount_rate" integer NOT NULL,
    "start_date" character varying NOT NULL,
    "end_date" character varying NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "promotion";
INSERT INTO "promotion" ("id", "name", "description", "discount_rate", "start_date", "end_date", "created_at", "updated_at") VALUES
(1,	'Test 1',	'àafvsasf',	14,	'15/1/24',	'30/1/24',	'2024-01-08 08:18:48.833175',	'2024-01-08 08:18:48.833175');

DROP TABLE IF EXISTS "promotion_category";
DROP SEQUENCE IF EXISTS promotion_category_id_seq;
CREATE SEQUENCE promotion_category_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."promotion_category" (
    "id" integer DEFAULT nextval('promotion_category_id_seq') NOT NULL,
    "categoryId" integer,
    "promotionId" integer,
    CONSTRAINT "PK_87c15411be1320ca210e1e2ed80" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "promotion_category";
INSERT INTO "promotion_category" ("id", "categoryId", "promotionId") VALUES
(1,	1,	1),
(6,	1,	1),
(7,	1,	1);

DROP TABLE IF EXISTS "shipping_method";
DROP SEQUENCE IF EXISTS shipping_method_id_seq;
CREATE SEQUENCE shipping_method_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shipping_method" (
    "id" integer DEFAULT nextval('shipping_method_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "price" character varying NOT NULL,
    CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "shipping_method";
INSERT INTO "shipping_method" ("id", "name", "price") VALUES
(1,	'COD',	'4000'),
(2,	'Fast ship',	'50000');

DROP TABLE IF EXISTS "shop_order";
DROP SEQUENCE IF EXISTS shop_order_id_seq;
CREATE SEQUENCE shop_order_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shop_order" (
    "id" integer DEFAULT nextval('shop_order_id_seq') NOT NULL,
    "order_total" integer NOT NULL,
    "orderStatusId" integer,
    "userId" integer,
    "paymentMethodId" integer,
    "shippingAddressId" integer,
    "shippingMethodId" integer,
    "order_date" timestamp DEFAULT now(),
    CONSTRAINT "PK_aff7956a99be3a90c1075744b6a" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "shop_order";
INSERT INTO "shop_order" ("id", "order_total", "orderStatusId", "userId", "paymentMethodId", "shippingAddressId", "shippingMethodId", "order_date") VALUES
(22,	10442,	1,	1,	1,	1,	2,	'2024-01-20 17:24:42.185627'),
(23,	10442,	1,	1,	1,	1,	2,	'2024-01-20 17:45:10.709042'),
(24,	10442,	1,	1,	1,	1,	2,	'2024-01-20 17:47:10.271568'),
(25,	10442,	1,	1,	1,	1,	2,	'2024-01-20 17:48:57.564231'),
(26,	10442,	1,	1,	1,	1,	2,	'2024-01-20 18:17:12.395274'),
(27,	10442,	1,	1,	1,	1,	2,	'2024-01-20 18:17:57.409429'),
(28,	10442,	1,	1,	1,	1,	2,	'2024-01-20 18:20:33.53293'),
(29,	10442,	1,	1,	1,	1,	2,	'2024-01-20 18:24:51.289033'),
(30,	10442,	1,	1,	1,	1,	2,	'2024-01-20 18:31:11.83308');

DROP TABLE IF EXISTS "shopping_cart";
DROP SEQUENCE IF EXISTS shopping_cart_id_seq;
CREATE SEQUENCE shopping_cart_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shopping_cart" (
    "id" integer DEFAULT nextval('shopping_cart_id_seq') NOT NULL,
    "userId" integer,
    CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY ("id"),
    CONSTRAINT "REL_bee83828c1e181ac7ba97267ca" UNIQUE ("userId")
) WITH (oids = false);

TRUNCATE "shopping_cart";

DROP TABLE IF EXISTS "shopping_cart_item";
DROP SEQUENCE IF EXISTS shopping_cart_item_id_seq;
CREATE SEQUENCE shopping_cart_item_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shopping_cart_item" (
    "id" integer DEFAULT nextval('shopping_cart_item_id_seq') NOT NULL,
    "qty" integer NOT NULL,
    "cartId" integer,
    "productItemId" integer,
    CONSTRAINT "PK_15909d00f68f8f022e5545745aa" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "shopping_cart_item";

DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "usermame" character varying NOT NULL,
    "password" character varying NOT NULL,
    "email" character varying NOT NULL,
    "refresh_token" character varying,
    "role" character varying DEFAULT 'normal' NOT NULL,
    "profileImg" character varying,
    "bio" text,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
) WITH (oids = false);

TRUNCATE "user";
INSERT INTO "user" ("id", "usermame", "password", "email", "refresh_token", "role", "profileImg", "bio", "created_at", "updated_at") VALUES
(1,	'dat198hp',	'$2b$10$8AuXz4J5lvppGeU8gIcqJuklLk9LDWcmOhxM8VpgIGbDWy3UUPClO',	'dat198hp@gmail.com',	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXQxOThocEBnbWFpbC5jb20iLCJyb2xlIjoibm9ybWFsIiwiaWF0IjoxNzAzOTQxNjQ4LCJleHAiOjE3MDQwMjgwNDh9.A80w4M1Mej5oSdGUl-xAbqdaKwubnDmIqsVystvrr7A',	'normal',	NULL,	NULL,	'2023-12-30 13:07:25.612187',	'2023-12-30 13:07:28.716851');

DROP TABLE IF EXISTS "user_address";
DROP SEQUENCE IF EXISTS user_address_id_seq;
CREATE SEQUENCE user_address_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user_address" (
    "id" integer DEFAULT nextval('user_address_id_seq') NOT NULL,
    "isDefault" character varying NOT NULL,
    "userId" integer,
    "countryId" integer,
    CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"),
    CONSTRAINT "REL_1abd8badc4a127b0f357d9ecbc" UNIQUE ("userId"),
    CONSTRAINT "REL_c82c2faa0ad2b5a847cc01887e" UNIQUE ("countryId")
) WITH (oids = false);

TRUNCATE "user_address";

DROP TABLE IF EXISTS "user_payment_method";
DROP SEQUENCE IF EXISTS user_payment_method_id_seq;
CREATE SEQUENCE user_payment_method_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user_payment_method" (
    "id" integer DEFAULT nextval('user_payment_method_id_seq') NOT NULL,
    "price" character varying NOT NULL,
    "provider" character varying NOT NULL,
    "account_number" character varying NOT NULL,
    "expiry_date" character varying NOT NULL,
    "is_default" boolean NOT NULL,
    "userId" integer,
    "paymentTypeId" integer,
    CONSTRAINT "PK_7bc6324e8d41c2f3bd69c1d905f" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "user_payment_method";
INSERT INTO "user_payment_method" ("id", "price", "provider", "account_number", "expiry_date", "is_default", "userId", "paymentTypeId") VALUES
(1,	'10',	'GJFD',	'0869029018',	'18/30',	't',	1,	1);

DROP TABLE IF EXISTS "user_review";
DROP SEQUENCE IF EXISTS user_review_id_seq;
CREATE SEQUENCE user_review_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user_review" (
    "id" integer DEFAULT nextval('user_review_id_seq') NOT NULL,
    "rate_vaue" integer NOT NULL,
    "comment" integer NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "userId" integer,
    "revirewOrderId" integer,
    CONSTRAINT "PK_261724703ac0fe70a85eb3f3af6" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "user_review";

DROP TABLE IF EXISTS "variation";
DROP SEQUENCE IF EXISTS variation_id_seq;
CREATE SEQUENCE variation_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."variation" (
    "id" integer DEFAULT nextval('variation_id_seq') NOT NULL,
    "category_name" character varying NOT NULL,
    "categoryId" integer,
    CONSTRAINT "PK_739a8640e52a196d9df6a31211a" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "variation";
INSERT INTO "variation" ("id", "category_name", "categoryId") VALUES
(1,	't',	1),
(2,	'Test api',	1),
(3,	'color',	3),
(4,	'size',	3),
(5,	'type',	3);

DROP TABLE IF EXISTS "variation_option";
DROP SEQUENCE IF EXISTS variation_option_id_seq;
CREATE SEQUENCE variation_option_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."variation_option" (
    "id" integer DEFAULT nextval('variation_option_id_seq') NOT NULL,
    "value" character varying NOT NULL,
    "variationId" integer,
    CONSTRAINT "PK_c625edd870a3d28448c1bf79837" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "variation_option";
INSERT INTO "variation_option" ("id", "value", "variationId") VALUES
(1,	'20',	1);

ALTER TABLE ONLY "public"."address" ADD CONSTRAINT "FK_d87215343c3a3a67e6a0b7f3ea9" FOREIGN KEY ("countryId") REFERENCES country(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."order_line" ADD CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f" FOREIGN KEY ("orderId") REFERENCES shop_order(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."order_line" ADD CONSTRAINT "FK_d9de79893054ae71683a7ee597c" FOREIGN KEY ("productItemId") REFERENCES product_item(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES product_category(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product_category" ADD CONSTRAINT "FK_252ab3e890dc3863981921c9745" FOREIGN KEY ("promotionsId") REFERENCES promotion_category(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."product_category" ADD CONSTRAINT "FK_a38ad62c794b2585da78c423e85" FOREIGN KEY ("parentCategoryId") REFERENCES product_category(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product_configuration" ADD CONSTRAINT "FK_653182f74ce4eae415d61ede4f4" FOREIGN KEY ("productItemId") REFERENCES product_item(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."product_configuration" ADD CONSTRAINT "FK_d38aa5c10cf37519de22809e4fa" FOREIGN KEY ("variationOptionId") REFERENCES variation_option(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product_item" ADD CONSTRAINT "FK_5be351f01d190ba6c78adc013a9" FOREIGN KEY ("productId") REFERENCES product(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."promotion_category" ADD CONSTRAINT "FK_090a7d7e58ff24a7955017bbc63" FOREIGN KEY ("promotionId") REFERENCES promotion(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."promotion_category" ADD CONSTRAINT "FK_5206df6d768890df720c1ddc41a" FOREIGN KEY ("categoryId") REFERENCES product_category(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shop_order" ADD CONSTRAINT "FK_26859f3f6194dcc6b67d88de2a5" FOREIGN KEY ("orderStatusId") REFERENCES order_status(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shop_order" ADD CONSTRAINT "FK_3ef088492bf99e3c249d64540fe" FOREIGN KEY ("paymentMethodId") REFERENCES user_payment_method(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shop_order" ADD CONSTRAINT "FK_84578b83091c56783495bb94e4b" FOREIGN KEY ("shippingAddressId") REFERENCES address(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shop_order" ADD CONSTRAINT "FK_a76aacd2fbf9e6f6330fd20be32" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shop_order" ADD CONSTRAINT "FK_c1b494c558736e23a40e9c01724" FOREIGN KEY ("shippingMethodId") REFERENCES shipping_method(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shopping_cart" ADD CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shopping_cart_item" ADD CONSTRAINT "FK_873b63ba9b97dcf475c40e97681" FOREIGN KEY ("productItemId") REFERENCES product_item(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shopping_cart_item" ADD CONSTRAINT "FK_c746464c7c3208d3ad7d7a9153e" FOREIGN KEY ("cartId") REFERENCES shopping_cart(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."user_address" ADD CONSTRAINT "FK_c82c2faa0ad2b5a847cc01887e4" FOREIGN KEY ("countryId") REFERENCES address(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_payment_method" ADD CONSTRAINT "FK_00c9609864e185adce0a39ad5fd" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."user_payment_method" ADD CONSTRAINT "FK_94a43c705b093b8ebad748f3568" FOREIGN KEY ("paymentTypeId") REFERENCES payment_type(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_review" ADD CONSTRAINT "FK_221c981feafb4a616fa8dac779c" FOREIGN KEY ("revirewOrderId") REFERENCES shop_order(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."user_review" ADD CONSTRAINT "FK_a9a4ba3477d8c1b52e048c1d532" FOREIGN KEY ("userId") REFERENCES "user"(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."variation" ADD CONSTRAINT "FK_07cfd3fe4515c0fc98236ae9426" FOREIGN KEY ("categoryId") REFERENCES product_category(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."variation_option" ADD CONSTRAINT "FK_a06cf50cd60fc0e723ef8f7e84f" FOREIGN KEY ("variationId") REFERENCES variation(id) NOT DEFERRABLE;

-- 2024-01-20 18:48:21.701505+00

npm install;

npm run dev;

DATABASE:
create database tienda_familiar;
use tienda_familiar;
create table product (
product_id int primary key AUTO_INCREMENT,
name varchar(50) NOT NULL,
stock int DEFAULT 0,
type_measurement varchar(30) DEFAULT "Unidades",
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);
create table role_employee (
role_id int primary key AUTO_INCREMENT,
title varchar(50) NOT NULL,
description text,
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);
create table employee (
employee_id int primary key AUTO_INCREMENT,
full_name varchar(50) NOT NULL,
role_id_fk int NOT NULL,
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE,
foreign key(role_id_fk) references role_employee(role_id)
);

DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    deptName VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE position(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(11,2) NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE employee(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    first_name VARCHAR(30) NULL,
    title_id INTEGER(11)
    PRIMARY KEY (id)
);
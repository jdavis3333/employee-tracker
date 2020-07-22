DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(11,2),
    department_id INTEGER(11),
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER,
    PRIMARY KEY (id),
);

INSERT INTO department (dept_name)
VALUES ("Legal"), ("Sales"), ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", "120,000", "3"), ("Attorney", "120,000", "1"), ("Sales Rep", "60,000", "2");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Johnson", "1", "200"), ("Joan", "Jameson", "2", "300"), ("Val", "Elliott", "3", "400");


SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM roles;

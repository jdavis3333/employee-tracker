DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE roles(
    role_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(11,2) NULL,
    department_id INTEGER(11),
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee(
    employee_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INTEGER(11) NULL,
    manager_id INTEGER NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);

INSERT INTO department (dept_name)
VALUES ("Legal");

INSERT INTO department (dept_name)
VALUES ("Sales");

INSERT INTO department (dept_name)
VALUES ("Engineering");

INSERT INTO roles (title, salary)
VALUES ("Sales Rep", 60000);

INSERT INTO roles (title, salary)
VALUES ("Engineer", 120000);

INSERT INTO roles (title, salary)
VALUES ("Attorney", 120000);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jim", "Johnson", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joan", "Jameson", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Val", "Elliott", 3);


SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
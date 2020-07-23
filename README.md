# employee-tracker

A Content Management System to organize and plan a business by managing a company's employees, departments, and roles. 


### Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/)
* [MySQL](https://www.mysql.com/)

### Execution

![CLI](/CLI.PNG)

![GIF](/employee-tracker.gif)

* Created tables in MySQL
```
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
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER,
    PRIMARY KEY (id)
);
```      
* Created CLI user choices
```
            type: "rawlist",
            message: "What would you like to do",
            name: "userOptions",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
```      
* Table joining multiple tables
```
function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, roles.title, roles.salary FROM employee LEFT JOIN roles on employee.id = roles.id;", function (err, data) {
        if (err) throw err
        console.table(data);
        getUserInputs();
    })
```
* Adding a department
```
function addDepartment() {
inquirer.prompt([
    {
        type: "input",
        message: "What is the name of the department to add?",
        name: "departmentName"
    }
]).then(function (userResponse) {
    connection.query('INSERT INTO department (dept_name) VALUES (?);', userResponse.departmentName, function (err, data) {
        if (err) throw err
        console.log("Department added");
        getUserInputs();    
```
## Built With

* [MySQL](https://www.mysql.com/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Authors

* Joe Davis 

- [Link to Portfolio](https://jdavis3333.github.io/updated-portfolio/)
- [Link to Github](https://github.com/)
- [Link to LinkedIn](https://www.linkedin.com/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

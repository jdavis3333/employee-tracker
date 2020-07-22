const inquirer = require("inquirer")
const path = require("path");
var mysql = require("mysql")
var table = require("console.table")

//connect to mysql
var connection = mysql.createConnection({
    //port
    port: 3306,
    //username
    user: "root",
    //password
    password: "password",
    database: "tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    getUserInputs();
});

//create questions for CLI prompt
function getUserInputs() {
    inquirer.prompt([
        {
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
                "Remove Employee",
                "Update Employee Role",
            ]
        },
    ])
        .then(function (answer) {
            switch (answer.userOptions) {
                case "View All Employees":
                    viewAll();
                    break;

                case "View All Departments":
                    viewAllDepts();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Update Employee Manager":
                    updateEmployeeMgr();
                    break;

            }
        })
}

//create functions depending on user choices
function viewAll() {
    connection.query("SELECT * FROM EMPLOYEE", function (err, data) {
        if (err) throw err
        console.table(data);
        getUserInputs();
    })

}

function viewAllDepts() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err
        console.table(data);
        getUserInputs();
    })
}

function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, data) {
        if (err) throw err
        console.table(data);
        getUserInputs();
    })
}

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
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is this role's salary?",
            name: "roleSalary"
        },
        {
            type: "list",
            message: "What is the department ID?",
            name: "deptId",
            choices: [1, 2, 3, 4],
        }
    ]).then(function (userResponse) {
        connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);', [userResponse.roleName, userResponse.roleSalary, userResponse.deptId], function (err, data) {
            if (err) throw err
            console.log("Department added");
            getUserInputs();
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role ID?",
            name: "employeeRoleIs",
            choices: [1, 2, 3, 4]
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "empManager",
            choices: [4, 5, 6, 7]
        }
    ]).then(function (answers) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [answers.firstName, answers.lastName, answers.employeeRoleId, answers.empManager], function (err, res) {
            if (err) throw err
            console.log("Employee inserted");
            getUserInputs();
        })
    })
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "rawlist",
                message: "Which employee's role do you want to update?",
                name: "updateRole",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].id)
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                message: "What is the title of the role you'd like to update?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the role you'd like to update?",
                name: "salary",
            },
            {
                type: "list",
                message: "What department is this updated role in?",
                name: "department",
                choices: ["1","2","3","4"]
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE roles SET? WHERE ?",
                [
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department
                    },
                    {
                        id: answer.updateRole
                    }
                ],    
                    function (err,res) {
                    console.log(answer.title);
                    if (err) throw (err)
                    console.log("Role updated");
                    getUserInputs();
                }
            )

        })

    }
)}


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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    getUserInputs();
});

//create questions for CLI prompt
function getUserInputs () {
    inquirer.prompt([
        {
        type:"rawlist",
        message: "What would you like to do",
        name: "userOptions",
        choices: [
            "View All Employees", 
            "View All Employees By Department", 
            "View All Departments",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Remove Employee", 
            "Update Employee Role", 
            "Update Employee Manager"
        ]    
        },
    ])
    .then(function (answer) {
        switch (answer.userOptions) {
            case "View All Employees":
                viewAll();
                break;

            case "View All Employees By Department":
                viewAllInDept();
                break;

            case "View All Departments":
                viewAllDepts();
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
    connection.query("SELECT * FROM EMPLOYEE", function(err, data){
        if(err) throw err
        console.table(data);
        getUserInputs();
    })
    
}

function viewAllInDept() {
    connection.query("SELECT * FROM DEPARTMENT d, employee e, roles r where d.department_id=r.department_id and r.role_id=e.role_id;", function(err, data){
        if(err) throw err
        console.table(data);
        getUserInputs();
    })
}

function viewAllDepts() {
    connection.query("SELECT * FROM department", function(err, data){
        if(err) throw err
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
    ]).then(function(userResponse){
        connection.query('INSERT INTO department (dept_name) VALUES (?);', userResponse.departmentName, function(err, data){
            if(err) throw err
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
            choices: [1,2,3,4],
        }
    ]).then(function(userResponse){
        connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);', [userResponse.roleName, userResponse.roleSalary, userResponse.deptId], function(err, data){
            if(err) throw err
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
            name: "firstName"
        },
        {
            type: "list",
            message: "What is the employee's title?",
            name: "title",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"] //loop?
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "empManager",
            choices: [] //loop?
        }
    ]).then(function(answers){
        connection.query("", {

        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee's role do you want to update?",
            name: "empSelectRoleUpdate",
            list: [] //can this be populated with a loop?
        },
        {
            type: "list",
            message: "Which role would you like to update it to?",
            name: "roleUpdate",
            list: []
        }
    ]).then(function(answers){

    })

}


function updateEmployeeMgr() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee's manager do you want to update?",
            name: "selectEmployee",
            list: [] 
        },
        {
            type: "list",
            message: "Which employee do you want to set as manager for the selected employee?",
            name: "selectManager",
            list: [] 
        }
    ]).then(function(answers){

    })

}


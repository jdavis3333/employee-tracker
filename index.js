const inquirer = require("inquirer")
const path = require("path");
var mysql = require("mysql")

//connect to mysql
var connection = mysql.createConnection({
    //port
    port: 3306,
    //username
    user: "root",
    //password
    password: "password",
    database: "employee_trackerDB"
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
        type:"list",
        message: "What would you like to do",
        name: "userOptions",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees by Manager","Add Employee","Remove Employee", "Update Employee Role", "Update Employee Manager"]    
        },
    ]).then
    
}
// getUserInputs();
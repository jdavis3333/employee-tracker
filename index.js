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
        type: "",
        message: "",
        name: "",
        choices: ["",""]    
        },
    ])
    .then
}

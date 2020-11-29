const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Password",
    
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;

    start();
});

console.log("Welcome to our Employee Tracker Database");

/*
  getUserInput() uses inquirer to determine if the user wants to simply
  view the database, add to the database, or delete from the database.
*/

function getUserInput() {
    inquirer.prompt(

        [
            {
                name: "startOptions",
                type: "list",
                message: "Make a selection",
                choice: [
                    "add data",
                    "View Data",
                    "Update Data",
                    "Delete Data",
                    "Exit"

                ]
            }

        ]).then((answer) => {
            if (answer.startOptions === "View Data") {
                ViewData();
            }
            else if (answer.startOptions === "Add Data") {
                addData();
            }
            else if (answer.startOptions === "Update Data") {
                UpdateData();
            }
            else if (answer.startOptions === "Delete Data") {
                DeleteData();
            }
            else if (answer.startOptions === "Delete Data") {
                process.exit(1)
            }
        })

}



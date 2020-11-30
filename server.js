const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create the mysql connection, store in variable.
let connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,
    
    user: "root",
   
    password: "password",
   
    database: "employee_db"
});

// Connect to the database.
connection.connect((err) => {
    if (err) throw err;
    getUserInput();
});
console.log("Welcome to the Employee Tracker DataBase!\n Use the selector below to get started.")
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
                message: "Make a selection: ",
                choices: [
                    "Add Data",
                    "View Data",
                    "Update Data",
                    "Delete Data",
                    "Exit"
                ]
            }
        ]).then((answer) => {
            if (answer.startOptions === "View Data") {
                viewData();
            }
            
            else if (answer.startOptions === "Add Data") {
                addData();
            }
            
            else if (answer.startOptions === "Update Data") {
                updateData();
            }
            
            else if (answer.startOptions === "Delete Data") {
                deleteData();
            }
           
            else if (answer.startOptions === "Exit") {
                process.exit(1);
            }
        })
}
/*
    addData() asks the user what information they want to add to
    the database tables, including employees, roles and departments.
*/
function addData() {
    inquirer.prompt([
        {
            name: "addOptions",
            type: "list",
            message: "Select what you want to add to the database: ",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "Exit"
            ]
        }
    ]).then(function (answer) {
        if (answer.addOption === "Add Employee") {
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "First Name: "
                },

                {
                    name: "last_name",
                    type: "input",
                    message: "Last Name: "
                },
                
                {
                    name: "role_id",
                    type: "number",
                    message: "Role ID #: "
                }
            ]).then(function (answer) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(`Added employee, ${answer.first_name} ${answer.last_name}`);
                        getUserInput();
                    }
                )
            })
        } else if (answer.addOption === "Add Role") {
            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter title"
                },

                {
                    name: "salary",
                    input: "number",
                    message: "Enter salary"
                },

                {
                    name: "department_id",
                    type: "number",
                    message: "Enter Department"
                }
            ]).then(function(answer){
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(`Added role, ${answer.title} at salary ${answer.salary}`);
                        getUserInput();
                    }
                )
            })
        }
    });
}

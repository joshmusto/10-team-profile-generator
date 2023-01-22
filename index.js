//project needs stuff to run
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//main README write-up
function writeMain(writeTitle, writeLicenseBadge, writeDesc, writeInstall, writeUsage, writeLicense, writeContribute, writeTests, writeGithub, writeEmail) { return 

`<!doctype html>
<html>

    <head>
        <title>Team Profile</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Profiles for your team members">
        <meta name="keywords" content="keywords for search engines">
        <link rel="stylesheet" type="text/css" href="resetSrc.css">
        <link rel="stylesheet" type="text/css" href="styleSrc.css" />
    </head>

    <body>
	<header>
        <h1>My Team</h1>
    </header>
    <section id="cardSection">
        <section class="memberCard" id="manager">
            <section class="cardHeader">
                <h2>Manager Name</h2>
                <h3>Manager</h3>
            </section>
            <ul>
                <li>ID: 1</li>
                <li>Email: <a href="name@domain.com">name@domain.com</a></li>
                <li>Office Number: 1</li>
            </ul>
        </section>
        <section class="memberCard" id="engineer">
            <section class="cardHeader">
                <h2>Engineer Name</h2>
                <h3>Engineer</h3>
            </section>
            <ul>
                <li>ID: 2</li>
                <li>Email: <a href="name@domain.com">name@domain.com</a></li>
                <li>GitHub: <a href="github.com/username">username</a></li>
            </ul>
        </section>
        <section class="memberCard" id="intern">
            <section class="cardHeader">
                <h2>Intern Name</h2>
                <h3>Intern</h3>
            </section>
            <ul>
                <li>ID: 3</li>
                <li>Email: <a href="name@domain.com">name@domain.com</a></li>
                <li>School: School School</li>
            </ul>
        </section>
    </section>
    </body>

</html>`
}

//use inquirer to get info
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What kind of employee would you like to add?',
      name: 'role',
      choices: ['Manager', 'Engineer', 'Intern'],
    },
    {
        type: 'input',
        message: `What is the employee's name?`,
        name: 'name',
    },
    {
        type: 'input',
        message: `What is the employee's ID?`,
        name: 'id',
    },
    {
        type: 'input',
        message: `What is the employee's email?`,
        name: 'email',
    },
    {
        type: 'input',
        message: `What is the manager's office number?`,
        name: 'officeNumber',
        when: (answers) => answers.role === 'Manager',
    },
    {
        type: 'list',
        message: 'Would you like to add another employee?',
        name: 'again',
        choices: ['Yes', "No"],
      },
  ])
  .then(function(response) {
    //set variables
    let role = response.role;
    let name = response.name;
    let id = response.id;
    let email = response.email;
    if (role === "Manager") {
        let officeNumber = response.officeNumber;
        new Manager(name, id, email, officeNumber);
    }
    if (role === "Engineer") {
        
        new Engineer();
    }
    if (role === "Intern") {
        
        new Intern();
    }
    if (response.again === "Yes") {
        //go again
    }
    else {
        // create and write file
        // fs.writeFile(".dist/index.html", writeMain(writeTitle, writeLicenseBadge, writeDesc, writeInstall, writeUsage, writeLicense, writeContribute, writeTests, writeGithub, writeEmail), (err) =>
        // err ? console.log(err) : console.log('README generation complete.'));
    }
  });
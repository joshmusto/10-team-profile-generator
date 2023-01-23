//project needs stuff to run
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//main README write-up
function writeStart() { return `<!doctype html>
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
        `
}

function writeManager(class) { return `<section class="memberCard" id="manager">
    <section class="cardHeader">
        <h2>${class.getName()}</h2>
        <h3>Manager</h3>
    </section>
    <ul>
        <li>ID: ${class.getId()}</li>
        <li>Email: <a href="${class.getEmail()}">${class.getEmail()}</a></li>
        <li>Office Number: ${class.officeNumber}</li>
    </ul>
    </section>
    `
}

function writeEngineer(class) { return
    `<section class="memberCard" id="engineer">
    <section class="cardHeader">
        <h2>${class.getName()}</h2>
        <h3>Engineer</h3>
    </section>
    <ul>
        <li>ID: ${class.getId()}</li>
        <li>Email: <a href="${class.getEmail()}">${class.getEmail()}</a></li>
        <li>GitHub: <a href="https://github.com/${class.getGithub()}">${class.getGithub()}</a></li>
    </ul>
    </section>
    `
}
        
function writeIntern(class) { return
    `<section class="memberCard" id="intern">
    <section class="cardHeader">
        <h2>${class.getName()}</h2>
        <h3>Intern</h3>
    </section>
    <ul>
        <li>ID: ${class.getId()}</li>
        <li>Email: <a href="${class.getEmail()}">${class.getEmail()}</a></li>
        <li>School: ${class.getSchool()}</li>
    </ul>
    </section>
    `
}
        
function writeEnd() { return `</section>
    </body>

</html>`
}

function writeFull() { 
    writeStart();

    writeEnd();
}

//array of employees
const employeeArray = [];

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
        const addM = new Manager(name, id, email, officeNumber);
        employeeArray.push(addM);
    }
    if (role === "Engineer") {
        
        const addE = new Engineer();
        employeeArray.push(addE);
    }
    if (role === "Intern") {
        
        const addI = new Intern();
        employeeArray.push(addI);
    }
    if (response.again === "Yes") {
        //go again
    }
    else {
        // create and write file
        // fs.writeFile(".dist/index.html", writeStart(), (err) =>
        // err ? console.log(err) : console.log('README generation complete.'));
    }
  });
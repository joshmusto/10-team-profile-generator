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

function writeManager(entry) { return `<section class="memberCard" id="manager">
    <section class="cardHeader">
        <h2>${entry.getName()}</h2>
        <h3>Manager</h3>
    </section>
    <ul>
        <li>ID: ${entry.getId()}</li>
        <li>Email: <a href="${entry.getEmail()}">${entry.getEmail()}</a></li>
        <li>Office Number: ${entry.officeNumber}</li>
    </ul>
    </section>
    `
}

function writeEngineer(entry) { return `<section class="memberCard" id="engineer">
    <section class="cardHeader">
        <h2>${entry.getName()}</h2>
        <h3>Engineer</h3>
    </section>
    <ul>
        <li>ID: ${entry.getId()}</li>
        <li>Email: <a href="${entry.getEmail()}">${entry.getEmail()}</a></li>
        <li>GitHub: <a href="https://github.com/${entry.getGithub()}">${entry.getGithub()}</a></li>
    </ul>
    </section>
    `
}
        
function writeIntern(entry) { return `<section class="memberCard" id="intern">
    <section class="cardHeader">
        <h2>${entry.getName()}</h2>
        <h3>Intern</h3>
    </section>
    <ul>
        <li>ID: ${entry.getId()}</li>
        <li>Email: <a href="${entry.getEmail()}">${entry.getEmail()}</a></li>
        <li>School: ${entry.getSchool()}</li>
    </ul>
    </section>
    `
}
        
function writeEnd() { return `</section>
    </body>

</html>`
} 

//array of employees
const employeeArray = [];

//use inquirer to get info
function askQuestions() {
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
            type: 'input',
            message: `What is the engineer's github username?`,
            name: 'github',
            when: (answers) => answers.role === 'Engineer',
        },
        {
            type: 'input',
            message: `What school is the intern from?`,
            name: 'school',
            when: (answers) => answers.role === 'Intern',
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
            let github = response.github;
            const addE = new Engineer(name, id, email, github);
            employeeArray.push(addE);
        }
        if (role === "Intern") {
            let school = response.school;
            const addI = new Intern(name, id, email, school);
            employeeArray.push(addI);
        }
        if (response.again === "Yes") {
            askQuestions();
        }
        else {
            console.log(employeeArray);
            //create and write file
            //start
            fs.writeFile("./dist/index.html", writeStart(), (err) =>
            err ? console.log(err) : console.log('HTML writing has begun...'));
            
            //employees
            employeeArray.forEach(element => {
                if (element==="Manager") {
                    fs.appendFile("./dist/index.html", writeManager(element), (err) => err ? console.log(err) : console.log(`Manager ${element.name} written...`)); 
                }
                else if (element==="Engineer") {
                    fs.appendFile("./dist/index.html", writeEngineer(element), (err) => err ? console.log(err) : console.log(`Engineer ${element.name} written...`)); 
                }
                else if (element==="intern") {
                    fs.appendFile("./dist/index.html", writeIntern(element), (err) => err ? console.log(err) : console.log(`Intern ${element.name} written...`)); 
                }
            })
            //end
            fs.appendFile("./dist/index.html", writeEnd(), (err) => err ? console.log(err) : console.log(`Generation complete! Enjoy your site!`));
        }
    })
};

askQuestions();
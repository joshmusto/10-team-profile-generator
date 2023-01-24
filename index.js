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
            <link rel="stylesheet" type="text/css" href="reset.css">
            <link rel="stylesheet" type="text/css" href="style.css" />
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

function writeCSSMain() {
    return `* {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    
    header {
        text-align: center;
        padding: 20px;
        background-color: rgb(48, 104, 245);
        margin: 0 0 20px 0;
    }
    
    h1 {
        font-size: 40px;
        color: white;
    }
    h2 {
        font-size: 30px;
        color: white;
        margin: 0 0 10px 0;
    }
    h3{
        font-size: 20px;
        color: white;
    }
    
    #cardSection{
        text-align: center;
    }
    
    .memberCard {
        display: inline-block;
        text-align: left;
        margin: 20px 10px 0 10px;
        background-color: rgb(240, 250, 255);
        box-shadow: 5px 5px 10px gray;
    }
    
    .cardHeader{
        padding: 20px;
        background-color: rgb(48, 104, 245);
    }
    
    .memberCard ul{
        list-style: none;
        background-color: white;
        margin: 20px;
    }
    
    .memberCard ul li{
        padding: 10px;
        border-style: solid;
        border-color: rgb(48, 104, 245);
        border-width: 1px;
    }`
}

function writeCSSReset() {
    return `/* 
    html5doctor.com Reset Stylesheet
    v1.6.1
    Last Updated: 2010-09-17
    Author: Richard Clark - http://richclarkdesign.com 
    Twitter: @rich_clark
    */
    
    html, body, div, span, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    abbr, address, cite, code,
    del, dfn, em, img, ins, kbd, q, samp,
    small, strong, sub, sup, var,
    b, i,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section, summary,
    time, mark, audio, video {
        margin:0;
        padding:0;
        border:0;
        outline:0;
        font-size:100%;
        vertical-align:baseline;
        background:transparent;
    }
    
    body {
        line-height:1;
    }
    
    article,aside,details,figcaption,figure,
    footer,header,hgroup,menu,nav,section { 
        display:block;
    }
    
    nav ul {
        list-style:none;
    }
    
    blockquote, q {
        quotes:none;
    }
    
    blockquote:before, blockquote:after,
    q:before, q:after {
        content:'';
        content:none;
    }
    
    a {
        margin:0;
        padding:0;
        font-size:100%;
        vertical-align:baseline;
        background:transparent;
    }
    
    /* change colours to suit your needs */
    ins {
        background-color:#ff9;
        color:#000;
        text-decoration:none;
    }
    
    /* change colours to suit your needs */
    mark {
        background-color:#ff9;
        color:#000; 
        font-style:italic;
        font-weight:bold;
    }
    
    del {
        text-decoration: line-through;
    }
    
    abbr[title], dfn[title] {
        border-bottom:1px dotted;
        cursor:help;
    }
    
    table {
        border-collapse:collapse;
        border-spacing:0;
    }
    
    /* change border colour to suit your needs */
    hr {
        display:block;
        height:1px;
        border:0;   
        border-top:1px solid #cccccc;
        margin:1em 0;
        padding:0;
    }
    
    input, select {
        vertical-align:middle;
    }`
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
            employeeArray.push(writeManager(addM));
        }
        if (role === "Engineer") {
            let github = response.github;
            const addE = new Engineer(name, id, email, github);
            employeeArray.push(writeEngineer(addE));
        }
        if (role === "Intern") {
            let school = response.school;
            const addI = new Intern(name, id, email, school);
            employeeArray.push(writeIntern(addI));
        }
        if (response.again === "Yes") {
            askQuestions();
        }
        else {
            console.log(employeeArray);
            //create and write file
            function writeDoc1() {
                fs.writeFile("dist/index.html", writeStart(), (err) =>
                err ? console.log(err) : console.log('HTML writing has begun...'));
                setTimeout(writeDoc2, 1000);
            }
            //employees function
            function writeDoc2() {
                for (let i = 0; i < employeeArray.length; i++) {
                    fs.appendFile("dist/index.html", employeeArray[i], (err) => err ? console.log(err) : console.log(`Writing employee ${i+1} out of ${employeeArray.length}...`));
                }
                setTimeout(writeDoc3, 1000);
            }
            //end function
            function writeDoc3() {
                fs.appendFile("dist/index.html", writeEnd(), (err) => err ? console.log(err) : console.log(`Generation complete! Enjoy your site!`));
            }
            writeDoc1();
            //write accompanying CSS
            fs.writeFile("dist/style.css", writeCSSMain(), (err) => err ? console.log(err) : console.log("CSS stylehseet has been written."))
            //write accompanying CSS
            fs.writeFile("dist/reset.css", writeCSSReset(), (err) => err ? console.log(err) : console.log("CSS reset sheet has been written."))
        }
    })
};

askQuestions();
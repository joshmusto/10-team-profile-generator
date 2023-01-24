const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, github) {
        //get stuff from Employee
        super(name, id, email);
        //set office number
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;
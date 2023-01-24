const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school) {
        //get stuff from Employee
        super(name, id, email);
        //set office number
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;
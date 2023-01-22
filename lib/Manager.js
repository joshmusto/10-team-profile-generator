const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber) {
        //get stuff from Employee
        super(name, id, email, getName(), getId(), getEmail());
        //set office number
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;
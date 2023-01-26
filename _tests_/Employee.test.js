const Employee = require("../lib/Employee");

describe("Set up a new Employee object", () => {
    test("Given name, ID and email are set to variables within the object", () => {
        //the test
        //declare some kind of input const
        const testEmployee = new Employee("Name", 1, "mail@email.com");

        //declare the expected output from the input with an output const
        //expect(function(input)).toEqual(output);
        expect(testEmployee.name).toBe("Name");
        expect(testEmployee.id).toBe(1);
        expect(testEmployee.email).toBe("mail@email.com");
    });
    test("Object functions return as expected", () => {
        //test object
        const testEmployee = new Employee("Name", 1, "mail@email.com");

        //test results
        expect(testEmployee.getName()).toBe("Name");
        expect(testEmployee.getId()).toBe(1);
        expect(testEmployee.getEmail()).toBe("mail@email.com");
        expect(testEmployee.getRole()).toBe("Employee");
    });
});
const Employee = require("../lib/Employee");

describe("Set up a new Employee object", () => {
    test("Given name, ID and email are set to variables within the object", () => {
        //the test
        //declare some kind of input const
        const testEmployee = new Employee("Name", 1, "mail@email.com");

        //declare the expected output from the input with an output const
        //expect(function(input)).toEqual(output);
        expect(testEmployee.name).toBe("Name");
    });
});
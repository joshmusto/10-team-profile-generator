const Manager = require("../lib/Manager");

describe("Set up a new Manager object", () => {
    test("Given name, ID, email, and office number are set to variables within the object", () => {
        //test object
        const testManager = new Manager("Name", 1, "mail@email.com", 101);

        //test results
        expect(testManager.name).toBe("Name");
        expect(testManager.id).toBe(1);
        expect(testManager.email).toBe("mail@email.com");
        expect(testManager.officeNumber).toBe(101);
    });
    test("Object functions return as expected", () => {
        //test object
        const testManager = new Manager("Name", 1, "mail@email.com", 101);

        //test results
        expect(testManager.getName()).toBe("Name");
        expect(testManager.getId()).toBe(1);
        expect(testManager.getEmail()).toBe("mail@email.com");
        expect(testManager.getRole()).toBe("Manager");
    });
});
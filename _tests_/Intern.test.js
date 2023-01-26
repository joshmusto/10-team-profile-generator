const Intern = require("../lib/Intern");

describe("Set up a new Intern object", () => {
    test("Given name, ID, email, and school are set to variables within the object", () => {
        //test object
        const testIntern = new Intern("Name", 1, "mail@email.com", "Cool Guy University");

        //test results
        expect(testIntern.name).toBe("Name");
        expect(testIntern.id).toBe(1);
        expect(testIntern.email).toBe("mail@email.com");
        expect(testIntern.school).toBe("Cool Guy University");
    });
    test("Object functions return as expected", () => {
        //test object
        const testIntern = new Intern("Name", 1, "mail@email.com", "Cool Guy University");

        //test results
        expect(testIntern.getName()).toBe("Name");
        expect(testIntern.getId()).toBe(1);
        expect(testIntern.getEmail()).toBe("mail@email.com");
        expect(testIntern.getSchool()).toBe("Cool Guy University");
        expect(testIntern.getRole()).toBe("Intern");
    });
});
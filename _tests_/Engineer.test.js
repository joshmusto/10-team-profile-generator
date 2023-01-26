const Engineer = require("../lib/Engineer");

describe("Set up a new Engineer object", () => {
    test("Given name, ID, email, and GitHub username are set to variables within the object", () => {
        //test object
        const testEngineer = new Engineer("Name", 1, "mail@email.com", "gitHubUsername");

        //test results
        expect(testEngineer.name).toBe("Name");
        expect(testEngineer.id).toBe(1);
        expect(testEngineer.email).toBe("mail@email.com");
        expect(testEngineer.github).toBe("gitHubUsername");
    });
    test("Object functions return as expected", () => {
        //test object
        const testEngineer = new Engineer("Name", 1, "mail@email.com", "gitHubUsername");

        //test results
        expect(testEngineer.getName()).toBe("Name");
        expect(testEngineer.getId()).toBe(1);
        expect(testEngineer.getEmail()).toBe("mail@email.com");
        expect(testEngineer.getGithub()).toBe("gitHubUsername");
        expect(testEngineer.getRole()).toBe("Engineer");
    });
});
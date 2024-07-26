import { faker } from "@faker-js/faker";
import { pageObject } from "./pageObject";
import path from "path";

export class cardContainer extends pageObject {
    public readonly save = this.host.getByRole("button", {name: "Save"});
    public readonly cancel = this.host.getByRole("button", {name: "Cancel"});

    async saveRecord() {
        await this.save.click();
    }
}

export class employeeCardContainer extends cardContainer {
    public readonly firstName = this.host.getByPlaceholder('First Name');
    public readonly middleName = this.host.getByPlaceholder('Middle Name');
    public readonly lastName = this.host.getByPlaceholder('Last Name');
    public readonly employeeId = this.host.locator('//div/label[text()="Employee Id"]/../following-sibling::div/input');
    public readonly profile = this.host.locator(".oxd-file-input");
    public readonly includeLogin = this.host.locator(".oxd-switch-wrapper");
    public readonly userName = this.host.locator('input:near(label:has-text("Username"))');
    public readonly password = this.host.locator('input[type="password"]').first();
    public readonly passwordConfirm = this.host.locator('input[type="password"]').nth(1);
    public readonly passwordWarning = this.host.getByText("Passwords do not match");

    async addDetails() {
        await this.firstName.fill(faker.person.firstName());
        await this.middleName.fill(faker.person.middleName());
        await this.lastName.fill(faker.person.lastName());
        await this.employeeId.clear();
        await this.profile.setInputFiles(path.join(__dirname, '../../testdata', 'fa.jpg'));
        await this.includeLogin.click();
        await this.userName.fill(faker.internet.userName());
        let tempPassword = 'a0' + faker.internet.password({length:10});
        await this.password.fill(tempPassword);
        await this.passwordConfirm.fill(tempPassword);
        await this.passwordWarning.waitFor({state:"hidden"});
        await this.saveRecord();
    }
}

export class claimCardContainer extends cardContainer {

}
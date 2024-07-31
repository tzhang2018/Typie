import { faker } from "@faker-js/faker";
import { pageObject } from "./pageObject";
import path from "path";
import { testUser } from "../../testdata/testUser";

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

    async addDetails(user: testUser) {
        await this.firstName.fill(user.givenName);

        if(user.middleName != undefined)
            await this.middleName.fill(String(user.middleName));
        
        await this.lastName.fill(user.lastName);
        await this.employeeId.clear();
        await this.profile.setInputFiles(path.join(__dirname, '../../testdata', 'fa.jpg'));

        if(user.withLogin) {
            await this.includeLogin.click();
            await this.userName.fill(String(user.loginUser));
            await this.password.fill(String(user.loginPassword));
            await this.passwordConfirm.fill(String(user.loginPassword));
            await this.passwordWarning.waitFor({state:"hidden"});
        }
        
        await this.saveRecord();
    }

    async addLoginDetails() {

    }
}

export class claimCardContainer extends cardContainer {

}
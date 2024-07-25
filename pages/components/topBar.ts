import { pageObject } from "./pageObject";

export class topBarHeader extends pageObject {
    public readonly hamburger = this.host.locator(".oxd-topbar-header-hamburger");
    public readonly userProfile = this.host.locator(".oxd-userdropdown-img");
    public readonly userDropdown = this.host.locator(".oxd-userdropdown");
    
    async logout() {
        await this.userDropdown.click();
        await this.host.getByRole("menuitem").filter({hasText:"Logout"}).click();
    }

    async loaded() {
        await this.userProfile.waitFor({state: "visible"});
    }

    async getBreadcrumb() : Promise<string|null> {
        return await this.host.locator("span:has(h6.oxd-topbar-header-breadcrumb-module)").textContent();
    }
}

export class topBarBody extends pageObject {
    public readonly help = this.host.getByTitle("Help");
}

export class employeeTopBarBody extends topBarBody {
    public readonly employeeList = this.host.getByText("Employee List");

    async gotoEmployeeList() {
        await this.employeeList.click();
    }
}
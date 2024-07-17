import { pageObject } from "./pageObject";

export class TopBar extends pageObject {
    public readonly hamburger = this.host.locator("css=oxd-topbar-header-hamburger");
    public readonly breadcrumb = this.host.locator("css=oxd-topbar-header-breadcrumb-module");
    public readonly userProfile = this.host.locator("//img[@class='oxd-userdropdown-img']");
    public readonly userDropdown = this.host.locator("//*[@class='oxd-userdropdown']");// //li[@class='oxd-userdropdown']
    public readonly logoutItem = this.host.getByRole("menuitem").filter({hasText:"Logout"});//locator("//*[text()='Logout']");
    
    async logout() {
        await this.userDropdown.click();
        await this.logoutItem.click();
    }

    async loaded() {
        await this.userProfile.waitFor({state: "visible"});
    }
}
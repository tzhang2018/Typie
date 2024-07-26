import { expect, Locator } from "@playwright/test";
import { topBarHeader } from "./components/topBar";
import { Page } from "./page";

export class NavigationPage extends Page {
    //Header
    public readonly header = new topBarHeader(this.page.locator("//div[@class='oxd-topbar-header']"));
    //Side panel
    public readonly pim = this.page.locator("a[href*='viewPimModule']");

    async gotoPim() {
        await this.pim.click();
    }

    async verifyHeaderBreadcrumb(expected: string) {
        await expect(this.header.breadcrumb).toHaveText(expected);
    }
}

export class NavigationPageEx extends Page {
    //Header
    public readonly header = new topBarHeader(this.page.locator("//div[@class='oxd-topbar-header']"));
    //Side panel
    public readonly pim = this.page.locator("a[href*='viewPimModule']");

    async gotoPim() : Promise<NavigationPageEx> {
        await this.pim.click();
        return this;
    }

    //Playwright prefer web-first assertion
    //However, will need to put assertion into page object?  
    async verifyHeaderBreadcrumb(expected: string) : Promise<NavigationPageEx> {
        await expect(this.header.breadcrumb).toHaveText(expected);
        return this;
    }

    async logout() {
        await this.header.logout();
    }
}
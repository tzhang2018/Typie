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
    public readonly hamburger2 = this.page.locator('div').filter({ hasText: /^Dashboard$/ }).locator('i');
    public readonly hamburger = this.page.locator(".oxd-topbar-header-title").locator('i');

    //Side panel
    public readonly pim = this.page.locator("a[href*='viewPimModule']");

    //check mobile viewport or not
    async gotoPim(isMobile:boolean) : Promise<NavigationPageEx> {
        if(isMobile) {
            await this.hamburger.click();
        }
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
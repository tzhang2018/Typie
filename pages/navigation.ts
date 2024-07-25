import { expect } from "@playwright/test";
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

    async getHeaderBreadcrumb() : Promise<string|null> {
        return await this.header.getBreadcrumb();
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

    async getHeaderBreadcrumb() : Promise<string|null> {
        return await this.header.getBreadcrumb();
    }

    async verifyHeaderBreadcrumb(expected: string) : Promise<NavigationPageEx> {
        expect(await this.getHeaderBreadcrumb()).toBe(expected);
        return this;
    }

    async logout() {
        await this.header.logout();
    }
}
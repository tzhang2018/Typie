import { Page as PlaywrightPage } from "@playwright/test";

export abstract class Page {
    
    public readonly page: PlaywrightPage;
    constructor(page: PlaywrightPage) {
        this.page = page;
    }

    async close() {
        this.page.close();
    }
}
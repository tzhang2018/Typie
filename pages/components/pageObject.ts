import { Locator } from "@playwright/test";

export abstract class PageObject {
    public readonly host: Locator;
    constructor(locator: Locator) {
        this.host = locator;
    }
}
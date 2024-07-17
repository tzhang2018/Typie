import { Locator } from "@playwright/test";

export abstract class pageObject {
    public readonly host: Locator;
    constructor(locator: Locator) {
        this.host = locator;
    }
}
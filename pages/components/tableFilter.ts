import { pageObject } from "./pageObject";

export class tableFilter extends pageObject {
    public readonly reset = this.host.locator("./button[@type='reset']");
    public readonly submit = this.host.locator("./button[@type='submit']");

    async getFilterTitle() : Promise<string|null> {
        return await this.host.locator("./h5[contains(@class, 'oxd-table-filter-title')]").textContent();
    }

    async filterByLabel(field: string, value: string) {
        await this.host.getByLabel(field).fill(value);
        await this.submit.click();
    }
}
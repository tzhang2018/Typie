import { pageObject } from "./pageObject";

export class paperContainer extends pageObject {
    public readonly add = this.host.getByRole("button").filter({hasText:/Add/});
    public readonly recordsFound = this.host.getByText(/Records Found/);

    async getNoRecordsFound() : Promise<number|null> {
        let result = await this.recordsFound.textContent();
        return result==undefined ? null : parseInt(result.replace(/[^0-9]/g,''));
    }

    async addRecord() {
        await this.add.click();
    }
}
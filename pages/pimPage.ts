import { tableFilter } from "./components/tableFilter";
import { paperContainer } from "./components/paperContainer";
import { Page } from "./page";
import { employeeCardContainer } from "./components/cardContainer";
import { employeeTopBarBody } from "./components/topBar";
import { personalDetails } from "./components/personalDetails";

export class pimPage extends Page {
    public readonly employeeFilter = new tableFilter(this.page.locator(".oxd-table-filter"));
    public readonly paperContainer = new paperContainer(this.page.locator(".orangehrm-paper-container"));
    public readonly topBar = new employeeTopBarBody(this.page.locator(".oxd-topbar-body"));

    public readonly newEmployee = new employeeCardContainer(this.page.locator(".orangehrm-card-container"));
    public readonly detailedEmployee =  new personalDetails(this.page.locator(".orangehrm-edit-employee"));

    async getNoRecords() : Promise<number|null> {
        return await this.paperContainer.getNoRecordsFound();
    }

    async addEmployee() {
        await this.paperContainer.addRecord();
        await this.newEmployee.addDetails();
        await this.page.waitForURL('**\/viewPersonalDetails\/empNumber\/**',{waitUntil:"networkidle"});
     }

    async gotoEmployeeList() {
        await this.topBar.gotoEmployeeList();
    }
}
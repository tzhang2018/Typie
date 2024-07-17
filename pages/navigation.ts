import { TopBar } from "./components/topBar";
import { Page } from "./page";

export class NavigationPage extends Page {
    //Header
    public readonly header = new TopBar(this.page.locator("//div[@class='oxd-topbar-header']"));
    //Side panel
    public readonly PIM = this.page.locator("a[href*='viewPimModule']");

    async GotoPim() {
        this.PIM.click();
    }
}
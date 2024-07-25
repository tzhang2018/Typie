import {test} from "@playwright/test";
import { NavigationPageEx } from "../pages/navigation";
import { LoginEx } from "../pages/login";

test.beforeEach(async({page})=> {
    await new LoginEx(page)
        .goto()
        .then(sut => sut.loginAs("Admin", "admin123"));    
 });
 
test.skip("UI testing", async({page}, testInfo)=>{
    await new NavigationPageEx(page)
        .gotoPim()
        .then(sut => sut.verifyHeaderBreadcrumb('PIM'));
});


test.afterEach(async({page})=>{
    await new NavigationPageEx(page).logout();
})
 
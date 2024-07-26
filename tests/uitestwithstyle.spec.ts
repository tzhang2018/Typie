import {test} from "@playwright/test";
import { NavigationPageEx } from "../pages/navigation";
import { LoginEx } from "../pages/login";
import { pimPageEx } from "../pages/pimPage";

test.beforeEach(async({page})=> {
    await new LoginEx(page)
        .goto()
        .then(sut => sut.loginAs("Admin", "admin123"));    
 });
 
test("UI testing", {tag:["@all", "@ui"]}, async({page}, testInfo)=>{
    await new NavigationPageEx(page)
        .gotoPim()
        .then(sut => sut.verifyHeaderBreadcrumb('PIM'));

    await new pimPageEx(page)
        .addEmployee()
        .then(sut => sut.addDetails())
        .then(sut => sut.gotoEmployeeList());
});


test.afterEach(async({page})=>{
    await new NavigationPageEx(page)
        .logout();
})

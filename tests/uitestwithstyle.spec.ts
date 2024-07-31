import {test} from "@playwright/test";
import { NavigationPageEx } from "../pages/navigation";
import { pimPageEx } from "../pages/pimPage";
import { testUserBuilder } from "../testdata/testUser";
 
test("UI test", {tag:["@all", "@ui"]}, async({page, isMobile}, testInfo)=>{
    //Test started already authenticated however need to go to base url again in test 
    // can also authenticated one per worker process
    page.goto('/');
    await new NavigationPageEx(page) 
        .gotoPim(isMobile)
        .then(sut => sut.verifyHeaderBreadcrumb('PIM'));

    let user = new testUserBuilder()
        .withLoginDetails()
        .build();

    await new pimPageEx(page)
        .addEmployee()
        .then(sut => sut.addDetails(user))
        .then(sut => sut.gotoEmployeeList());
});


test.skip("playground", async({page})=>{
    await page.goto('https://www.scrapethissite.com/pages/simple/');
    await page.waitForLoadState("networkidle");

    const countries = page.locator(`//h3[contains(normalize-space(),'Andorra')]/following-sibling::div/strong[1]`);
    const name = await countries.evaluateAll(element => element.map(el => el.textContent?.trim()));
    console.log(name);

});
import { test, expect } from '@playwright/test'
import { Login } from '../pages/login';
import { NavigationPage } from '../pages/navigation';
import { pimPage } from '../pages/pimPage';
import { testUserBuilder } from '../testdata/testUser';


test.beforeEach(async({page})=> {
   let login = new Login(page);
   await login.goto();
   await login.loginAs("Admin", "admin123");
});

test.skip("UI testing", {tag:["@all, @ui"]}, async ({page}) => {
    let nav = new NavigationPage(page);
    await nav.gotoPim();
    await nav.verifyHeaderBreadcrumb('PIM');

    let user = new testUserBuilder()
        .withLoginDetails()
        .build();
    let pim = new pimPage(page);
    await pim.addEmployee();
    await pim.addDetails(user);
    await pim.gotoEmployeeList();
});

test.afterEach(async({page})=>{
    let nav = new NavigationPage(page);
    await nav.header.logout();
})
  
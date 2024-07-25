import { test, expect } from '@playwright/test'
import { Login } from '../pages/login';
import { NavigationPage } from '../pages/navigation';
import { pimPage } from '../pages/pimPage';


test.beforeEach(async({page})=> {
   let login = new Login(page);
   await login.goto();
   await login.loginAs("Admin", "admin123");
});

test.skip("UI testing", {tag:["@all, @ui"]}, async ({page}, testInfo) => {
    let nav = new NavigationPage(page);
    await nav.gotoPim();
    expect(await nav.getHeaderBreadcrumb()).toBe('PIM');

    await testInfo.attach('pim module', { body: await page.screenshot(), contentType: 'image/png'});

    let pim = new pimPage(page);
    let totalNo = await pim.getNoRecords()??0;
    await pim.addEmployee();
    await testInfo.attach('person detail',{body: await page.screenshot(), contentType: 'image/png'});
    await pim.gotoEmployeeList();
    expect(await pim.getNoRecords()).toBe(totalNo + 1);
});

test.afterEach(async({page})=>{
    let nav = new NavigationPage(page);
    await nav.header.logout();
})
  
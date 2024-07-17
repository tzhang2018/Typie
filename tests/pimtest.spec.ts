import {test } from '@playwright/test'
import { Login } from '../pages/login';
import { NavigationPage } from '../pages/navigation';

test.beforeEach(async({page})=> {
    let sut = new Login(page);
    await sut.goto();
    await sut.loginAs("Admin", "admin123");
});

test("PIM Module", {tag:["@all, @pim"]}, async ({page}, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('pim module', { body: screenshot, contentType: 'image/png'});
});

test.afterEach(async({page})=>{
    let nav = new NavigationPage(page);
    await nav.header.logout();
})
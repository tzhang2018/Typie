import test, { expect } from "@playwright/test";

test("Subset testing - visual comparison", async({page})=>{
    await page.goto('/');

    //Run below first time, test runner return error due to no golden files yet
    await expect(page).toHaveScreenshot('landing.png');
});
import test from "@playwright/test";
import { LoginEx } from "../orange_pom/pages/login";
import path from "path";

const authFile = '../playwright/.auth/user.json';

test('authenticated', async({page})=>{
    await new LoginEx(page)
    .goto()
    .then(sut => sut.loginAs("Admin", "admin123"));

    await page.waitForURL('**\/dashboard\/index',{waitUntil:"networkidle"});
    await page.context().storageState({path:path.join(__dirname, authFile)});
});
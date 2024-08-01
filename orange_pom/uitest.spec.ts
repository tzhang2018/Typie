import { test } from '@playwright/test'
import { NavigationPage } from './pages/navigation';
import { pimPage } from './pages/pimPage';
import { testUserBuilder } from './testdata/testUser';


test.skip("UI testing", {tag:["@all, @ui"]}, async ({page}) => {
    let user = new testUserBuilder()
        .withLoginDetails()
        .build();

    let nav = new NavigationPage(page);
    await nav.gotoPim();
    await nav.verifyHeaderBreadcrumb('PIM');

    
    let pim = new pimPage(page);
    await pim.addEmployee();
    await pim.addDetails(user);
    await pim.gotoEmployeeList();
});


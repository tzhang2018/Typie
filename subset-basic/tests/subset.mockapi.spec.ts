import { test, expect } from '@playwright/test';


test.skip('file upload', async({page})=> {
    await page.goto('/file-uploads.html');
    //Example A
    const result = await Promise.all(
        [
            page.waitForEvent('filechooser'),
            page.click('input')
        ]);
    result[0].setFiles(__filename);
    await page.click('input[type=submit]');

    //Example B
    let fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('input');
    const fileChooser = await fileChooserPromise;
    fileChooser.setFiles(__filename);

    //Example C
    await page.locator('input[type=file]').setInputFiles(__filename);
});

test.skip('file download', async({page})=> {
    let downloadPromise = page.waitForEvent('download');
    await page.click('download');
    let download = await downloadPromise;
    await download.saveAs('/path/to/save'+ download.suggestedFilename());
});

test.skip('handling new pages', async ({page, context})=> {
    // example A
    // in HTML a tag, target="_blank" open the link in a new windows or tab
    var pagePromise = context.waitForEvent('page');
    await page.getByText('Open new tab').click();
    var pa = await pagePromise;
    // button on the new page/tab
    await pa.getByRole('button').click();
    console.log(await pa.title());

    // Example B
    // If the action to triggers the new page is unknown, use below
    context.on("page", async page => {
        await page.waitForLoadState();
        console.log(await page.title());
    })
});

test("Real API Response", async({page})=> {
    await page.goto('/network.html');
    let [response] = await Promise.all([
        page.waitForResponse('/api/v1/users.json'),
        page.click('text=Load user')
    ]);
    await expect(page.locator('#user-full-name')).toContainText('John Doe');
    let responseBody = await response.json();
    expect(responseBody.id).toBe(1);
    expect(responseBody.fullName).toBe('John Doe');
});

test.describe("Mock API Response", ()=>{
    test.beforeEach(async({page})=>{
        await page.route('/api/v1/users.json', async route => {
            await route.fulfill({
                body: JSON.stringify({
                    'id': 2,
                    'fullName': 'John Smith'
                }),
                contentType: 'application/json'
            });
        });
    });

    test("navigate to the page", async({page})=>{
        await page.goto('/network.html');
        await page.click('text=Load user');
        await expect(page.locator('#user-full-name')).toContainText('John Smith');
    });

    test.skip("Network event", async({page})=>{
        
    });
});
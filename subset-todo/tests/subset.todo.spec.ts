import test, { expect } from "@playwright/test";

test.beforeEach("setup", async({page})=> {
    await page.goto('');
});

test.describe("New todo", () => {
    test.only('add new todo', async({page})=>{
        const inputBox = page.locator('input.new-todo');
        const todoList = page.locator('.todo-list');
      
        await inputBox.fill('Learn Playwright');
        await inputBox.press('Enter');
        await expect(todoList).toHaveText('Learn Playwright');
        // 
        await page.locator('.filters').locator('text=Completed').click();
        await page.locator('.filters').scrollIntoViewIfNeeded();
        await expect(todoList).not.toHaveText('Learn Playwright');
    });

    test.skip('file upload - skipped', async({page})=> {
        await page.goto('/fileupload.html');
        //option A
        const result = await Promise.all(
            [
                page.waitForEvent('filechooser'),
                page.click('input')
            ]);
        result[0].setFiles(__filename);

        //option B
        let fileChooserPromise = page.waitForEvent('filechooser');
        await page.click('input');
        const fileChooser = await fileChooserPromise;
        fileChooser.setFiles(__filename);

        //option C
        //setInputFiles
    });
});
import test, { expect } from "@playwright/test";

test.beforeEach("setup", async({page})=> {
    await page.goto('https://todomvc.com/examples/javascript-es6/dist/');
});

test.describe("Misc code snippet", () => {

    test('CSS locators', async({page})=>{
        // CSS selectors
        let inputBox = page.locator('input.new-todo');
        await inputBox.fill('Milk');
        await inputBox.press('Enter');
        await expect(page.locator('.view label')).toHaveText('Milk');
        // can use >> to combine different selector
        await page.locator('.filters >> text=Completed').click();        
        await expect(page.locator('.todo-list')).not.toHaveText('Milk');
    });

    test('fancy CSS locators', async({page})=> {
        // pseudo-CSS selectors - matching by text
        await page.locator('.header .new-todo').fill('weebix');
        await page.locator('input.new-todo').press('Enter');

        //:has-text() - matches any element containing the text somewhere inside
        await expect(page.locator('label:has-text("weebix")')).toBeVisible();

        //:text() - matches smallest element containg the text, case-insensitive
        await page.locator('.footer :text("completed")').click();
        await expect(page.locator('.todo-list')).not.toHaveText('weebix');

        //:text-is() - matches smallest element with exact text
        //:text-matches("reg?ex", "i") - matches smallest element with regex
        await page.locator('.footer :text-is("All")').click();
        await page.locator('.todo-list .view input').check();

        //:visible() - only matches visible buttons
        //nth - query to the n-th on a zero-based index
        //await page.locator('button:visible').locator('nth=1').click();
        await page.locator(':nth-match(button:visible, 2)').click();
        //:has() - returns an element that contain other elements
        //comma-seperated list of css selector - :is()
        expect(await page.locator('a:has-text("All"),a:has-text("Active")')).toHaveCount(2);
        // match elements based on layout 
        //:above()/:below()/:near() 
        await page.locator('.header .new-todo').fill('bread');
        await page.locator('input.new-todo').press('Enter');
        expect(await page.innerText('a:left-of(:text("Active"))')).toBe('All');
        expect(await page.innerText('a:right-of(:text("Active"))')).toBe('Completed');
        
        // get parent element locator
        // option A
        //page.getByText('hello').locator('xpath=..');
        // option B
        //page.getByRole('listitem').filter({has: page.getByText('Hello')});
    });
});
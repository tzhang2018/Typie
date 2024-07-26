import test from "@playwright/test";

test('global teardown!', async({}) => {
    console.log("clean up resources globally!");
});
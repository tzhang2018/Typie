import test from "@playwright/test";

test("web performance", async({page}, testInfo) => {
    await page.goto('https://fastestwebsite.net/');

   let [timing] = await page.evaluate(() => {
    //entryType: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType
    return performance.getEntriesByType('navigation')
   })
   testInfo.annotations.push({type: 'Performance', description: `Navigation duration ${timing.duration}ms`});
});

test("performance for a slow network", async({page}, testInfo)=> {
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (2 * 1024 * 1024) / 4,
      uploadThroughput: (3 * 1024 * 1024) / 4,
      connectionType: 'cellular2g',
      latency: 10,
    });
    await page.goto('https://fastestwebsite.net/');

   let [timing] = await page.evaluate(() => {
    //entryType: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType
    return performance.getEntriesByType('navigation')
   })
   testInfo.annotations.push({type: 'Performance', description: `Navigation duration ${timing.duration}ms`});
});
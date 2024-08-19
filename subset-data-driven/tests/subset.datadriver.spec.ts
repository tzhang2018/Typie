import { test } from '@playwright/test'
import { pageObject } from '../../orange_pom/pages/components/pageObject';

test.describe('data driver test', async () => {
    test.beforeEach(async({page})=>{
        console.log('before each test');
    });
    test()
    test.afterEach(async({page})=>{

    });
});
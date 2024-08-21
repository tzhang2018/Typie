import { test } from '@playwright/test'
import { parse } from 'csv-parse/sync';
import path from 'path';
import fs from 'fs';

test.describe('data driver test - csv', () => {
    test.beforeEach(() => {
        console.log('before each');
    });

    let testCases:{FirstName:string, LastName:string}[] = [];
    testCases = parse(fs.readFileSync(path.join(__dirname, 'data.csv')), {
        columns: true,
        skip_empty_lines: true
    });
    testCases.forEach(testCase => {
        test(`test case ${testCase.FirstName} ${testCase.LastName}`, ()=>{
            console.log(testCase.FirstName, testCase.LastName);
        });
    });
    test.afterEach(() => {
        console.log('after each');
    });
});
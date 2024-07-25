import { request, test } from '@playwright/test'


test.skip("API testing - GET", {tag:["@all, @api"]}, async({request})=>{
    await request.fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'get',    
        headers: {
                ["Content-type"]:"application/json; charset=UTF-8",
            },
        params: {
            ["userId"]: "1"
        }
        })
        .then(response => response.json())
        .then(json => console.log(json));
});

test.skip("API Testing - POST", {tag:["@all", "@api"]}, async({request})=> {
    await request.fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'post',
        headers: {
            ['Content-type']: 'application/json; charset=UTF-8',
            ['Accept']: 'application/json'
        },
        data: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId : '1'
        })
    })
    .then(response => response.json())
    .then(json => console.log(json));
});
import { test } from '@playwright/test'
import { APIRequestBuilder } from './apiRequest';

test("API testing with builder - GET",{tag:["@all, @api"]}, async({request})=>{
    const req = new APIRequestBuilder()
        .setUrl('https://jsonplaceholder.typicode.com/posts')
        .setMethod('GET')
        .setParam('userId','1')
        .build();

    await request.fetch(req.url, {
        method: req.method,
        params: req.params,})
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
});


test("API testing with builder - POST", {tag:["@all", "@api"]}, async({request})=> {
    var newPost = { title: 'foo', body: 'bar', userId: '1' };

    const req = new APIRequestBuilder()
        .setUrl('https://jsonplaceholder.typicode.com/posts')
        .setMethod('POST')
        .setHeader('Content-type', 'application/json; charset=UTF-8')
        .setHeader('Accept', 'application/json')
        .setBody(newPost)
        .build();

    await request.fetch(req.url, {
        method: req.method,
        headers: req.headers,
        data: req.body})
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
});
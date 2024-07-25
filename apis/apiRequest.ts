
export class APIRequest {
    url: string;
    method: string;
    headers: {[name:string]:string};
    params: {[name:string]:string};
    body?:string;
}

export class APIRequestBuilder {
    private url: string = "https://httpbin.org/get";
    private method: string = "GET";
    private headers: {[name:string]:string} = {};
    private params:{[name:string]:string} = {};
    private body?:string;

    public setUrl(url:string): APIRequestBuilder {
        this.url = url;
        return this;
    }

    public setMethod(verb:string): APIRequestBuilder {
        this.method = verb;
        return this;
    }

    public setHeader(name: string, value: string): APIRequestBuilder {
        this.headers[name] = value;
        return this;
    }

    public setParam(name: string, value: string): APIRequestBuilder {
        this.params[name] = value;
        return this;
    }

    public setBody(body: object): APIRequestBuilder {
        this.body = JSON.stringify(body);
        return this;
    }

    public build(): APIRequest {
        let request = new APIRequest();
        request.url = this.url;
        request.method = this.method;
        request.headers = this.headers;
        request.params = this.params;
        request.body = this.body;
        return request;
    }
}
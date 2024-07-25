import { Page } from "./page";

export class Login extends Page {
    public readonly userName = this.page.getByPlaceholder("Username");
    public readonly password = this.page.getByPlaceholder("Password");
    public readonly submit = this.page.getByRole("button").filter({hasText:/Login/});

    async loginAs(user:string, password: string) {
        await this.userName.fill(user);
        await this.password.fill(password);
        await this.submit.click();
    }

    async goto() {
        await this.page.goto('/');
    }
}

export class LoginEx extends Page {
    public readonly userName = this.page.getByPlaceholder("Username");
    public readonly password = this.page.getByPlaceholder("Password");
    public readonly submit = this.page.getByRole("button").filter({hasText:/Login/});

    async loginAs(user:string, password: string) : Promise<LoginEx> {
        await this.userName.fill(user);
        await this.password.fill(password);
        await this.submit.click();
        return this;
    }

    async goto() : Promise<LoginEx> {
        await this.page.goto('/');
        return this;
    }
}
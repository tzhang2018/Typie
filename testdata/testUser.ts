import { faker } from "@faker-js/faker";

export class testUser {
    givenName: string;
    middleName?: string;
    lastName: string;
    withLogin: boolean;
    loginUser?: string;
    loginPassword?: string;
    driverLicenseNo?: string;
    nationality?: string;
}

export class testUserBuilder {
    givenName: string;
    middleName?: string;
    lastName: string;
    withLogin: boolean;
    loginUser: string;
    loginPassword: string;
    driverLicenseNo: string;
    nationality: string;

    constructor() {
        this.withLogin = false;
    }

    public withMiddleName(): testUserBuilder {
        this.middleName = faker.person.middleName();
        return this;
    }

    public withLoginDetails(): testUserBuilder {
        this.withLogin = true;
        this.loginUser = faker.internet.userName();
        this.loginPassword = 'a0' + faker.internet.password({length: 10});
        return this;
    }

    public withDriverLicense() : testUserBuilder {
        this.driverLicenseNo = `S${faker.lorem.word(6)}`;
        return this;
    }

    public withNationality(): testUserBuilder {
        this.nationality = faker.location.country();
        return this;
    }

    public build(): testUser {
        let result = new testUser();
        result.givenName = faker.person.firstName();
        result.middleName = this.middleName;
        result.lastName = faker.person.lastName();
        result.withLogin = this.withLogin;
        result.loginUser = this.loginUser;
        result.loginPassword = this.loginPassword;
        result.driverLicenseNo = this.driverLicenseNo;
        result.nationality = this.nationality;
        return result;
    }
}
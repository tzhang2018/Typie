
import { pageObject } from "./pageObject";

export class personalDetails extends pageObject {
    public readonly firstName = this.host.getByPlaceholder("First Name");
    public readonly save = this.host.getByText("Save").first();

}
import {Router} from "express";
import {RestDecoratorInfo} from "../types/rest-decorator";
import {cookieMakerApp} from "../index";

export class BaseRouter {
    public readonly router: Router = Router();

    constructor(
        protected cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        const ar: RestDecoratorInfo[] = Reflect.get(this, '_restApiCall') ?? [];
        for (const apiOperation of ar) {
            this.router[apiOperation.httpMethod](apiOperation.path, (...args) =>
                (this as any)[apiOperation.propertyName](...args));
        }


        // console.log(Reflect.get(this, '_restApiCall'));
    }
}
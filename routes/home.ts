import {Request, Response, Router} from "express";
import {cookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";
import {rest} from "../decorators/rest.decorator";
import {RestDecoratorInfo} from "../types/rest-decorator";


export class HomeRouter implements MyRouter {
    public readonly urlPrefix: string = '/';
    public readonly router: Router = Router();

    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    // private setUpRoutes(): void {
    //     this.router.get('/', this.home);
    // }    
    
    private setUpRoutes(): void {
        const ar: RestDecoratorInfo[] = Reflect.get(this, '_restApiCall') ?? [];
        for (const apiOperation of ar) {
            this.router[apiOperation.httpMethod](apiOperation.path, (this as any)[apiOperation.propertyName]);
        }


        // console.log(Reflect.get(this, '_restApiCall'));
    }
    
    

    @rest('get', '/')
    private home = (req: Request, res: Response): void => {
        const {addons, base, sum, allBases, allAddons} = this.cmApp.getCookieSettings(req);
        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}

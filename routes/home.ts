import {Request, Response, Router} from "express";
import {cookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";


export class HomeRouter implements MyRouter {
    public readonly urlPrefix: string = '/';
    public readonly router: Router = Router();

    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/', this.home);
    }

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

import {Request, Response, Router} from 'express';
import {cookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";

export class OrderRouter implements MyRouter {
    public readonly urlPrefix: string = '/order';
    public readonly router: Router = Router();

    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/summary', this.summary);
        this.router.get('/thanks', this.thanks);
    }


    private summary = (req: Request, res: Response): void => {
        const {addons, base, sum, allBases, allAddons} = this.cmApp.getCookieSettings(req);
        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    private thanks = (req: Request, res: Response): void => {
        const {sum} = this.cmApp.getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            })
    };
}



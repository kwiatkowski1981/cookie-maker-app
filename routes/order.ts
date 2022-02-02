import {Request, Response, Router} from 'express';
import {cookieMakerApp} from "../index";

export class OrderRouter {
    public readonly router: Router = Router();
    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.get('/summary', this.summary);
        this.router.get('/thanks', this.thanks);
    }


    summary = (req: Request, res: Response): void => {
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

    thanks = (req: Request, res: Response): void => {
        const {sum} = this.cmApp.getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            })
    };
}



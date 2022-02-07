import {Request, Response} from 'express';
import {get} from "../decorators/rest.decorator";
import {MyRouter} from "../types/my-router";
import {BaseRouter} from "./base";

export class OrderRouter extends BaseRouter implements MyRouter {
    public readonly urlPrefix: string = '/order';


    @get('/summary')
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


    @get('/thanks')
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



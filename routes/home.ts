import {Request, Response} from "express";
import {get} from "../decorators/rest.decorator";
import {MyRouter} from "../types/my-router";
import {BaseRouter} from "./base";


export class HomeRouter extends BaseRouter implements MyRouter {
    public readonly urlPrefix: string = '/';


    @get('/')
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

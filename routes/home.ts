import * as express from 'express';
import {Request, Response, Router} from "express";
import {cookieMakerApp} from "../index";


export class HomeRouter {
    public readonly router: Router = Router();
    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.get('/', this.home);
    }

    home = (req: Request, res: Response): void => {
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

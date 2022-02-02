import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import {Response, Request, Application, json, static as expressStatic} from "express";
import {engine} from "express-handlebars";

import {Entries} from "./types/entries";
import {HomeRouter} from './routes/home';
import {OrderRouter} from './routes/order';
import {ConfiguratorRouter} from './routes/configurator';
import {handlebarsHelpers} from './utils/handlebars-helpers';
import {COOKIE_BASES, COOKIE_ADDONS} from "./data/cookies-data";


export class cookieMakerApp {
    private app: Application;
    private port: number;
    private hostname: string;
    public readonly data = {
        COOKIE_BASES,
        COOKIE_ADDONS,
    }

    constructor() {
        this._configureApp();
        this._setRoutes();
        this._run();
    }

    private _configureApp(): void {
        this.app = express();
        this.port = 3000;
        this.hostname = '127.0.0.1';

        this.app.use(json());
        this.app.use(expressStatic('public'));
        this.app.use(cookieParser());

        this.app.engine('.hbs', engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    private _setRoutes(): void {
        this.app.use('/', new HomeRouter(this).router);
        this.app.use('/configurator', new ConfiguratorRouter(this).router);
        this.app.use('/order', new OrderRouter(this).router);
    }

    private _run(): void {
        this.app.listen(this.port, this.hostname);
    }

    public showErrorPage(res: Response, description: string) {
        return res.render('error', {
            description,
        })
    }

    getAddonsFromReq(req: Request): string[] {
        // konstrukcja "as {}" tworzy "mały" interface używany tylko w tym miejscu
        const {cookieAddons} = req.cookies as {
            cookieAddons: string
        };
        return cookieAddons ? JSON.parse(cookieAddons) : [];
    }

    getCookieSettings(req: Request): {
        addons: string[];
        base?: string;
        sum: number;
        allBases: Entries;
        allAddons: Entries;
    } {
        const {cookieBase: base} = req.cookies as {
            // na górze w 71 linii jest base? ale może być tak samo jak tutaj pod spodem "string | undefined" lub odwrotnie
            // na dole może być jak na górze ze znakiem zapytania cookieBase?: string;
            cookieBase: string | undefined;
        };
        const addons = this.getAddonsFromReq(req);

        const allBases = Object.entries(this.data.COOKIE_BASES);
        const allAddons = Object.entries(this.data.COOKIE_ADDONS);

        const sum = (base ? handlebarsHelpers['find-price'](allBases, base) : 0)
            + addons.reduce((prev, curr) => {
                return prev + handlebarsHelpers['find-price'](allAddons, curr)
            }, 0);
        return {
            addons,
            base,
            sum,
            allBases,
            allAddons,
        };
    }
}

new cookieMakerApp();
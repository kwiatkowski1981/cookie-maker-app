import {Request, Response, Router} from "express";
import {cookieMakerApp} from "../index";


export class ConfiguratorRouter {

    public readonly router: Router = Router();

    constructor(
        private cmApp: cookieMakerApp
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/select-base/:baseName', this.selectBase);
        this.router.get('/select-addon/:addonName', this.selectAddon);
        this.router.get('/remove-addon/:addonName', this.removeAddon);
    }


    private selectBase = (req: Request, res: Response): void => {
        const {baseName} = req.params as {
            baseName: string;
        };
        if (!(this.cmApp.data.COOKIE_BASES as Record<string, number>)[baseName]) {
            return this.cmApp.showErrorPage(res,
                `Oh no! There is no such base as ${baseName}.`);
        }
        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    };

    private selectAddon = (req: Request, res: Response): void => {
        const {addonName} = req.params as {
            addonName: string;
        };
        if (!(this.cmApp.data.COOKIE_ADDONS as Record<string, number>)[addonName]) {
            return this.cmApp.showErrorPage(res,
                `Oh no! There is no such addon as ${addonName}.`);
        }
        const addons = this.cmApp.getAddonsFromReq(req);
        if (addons.includes(addonName)) {
            return this.cmApp.showErrorPage(res,
                `Oh no! ${addonName} is already on your cookie, you cannot add it twice.`);
        }
        addons.push(addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });
    };

    private removeAddon = (req: Request, res: Response): void => {
        const {addonName} = req.params;
        const oldAddons = this.cmApp.getAddonsFromReq(req);
        if (!oldAddons.includes(addonName)) {
            return this.cmApp.showErrorPage(res,
                `Oh no! You can not remove something that isn't already added to the cookie 
                 ${addonName} not found on cookie.`);
        }
        const addons = oldAddons.filter(addon => addon !== addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/removed', {
                addonName,
            });
    };

}
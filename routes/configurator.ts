import {Request, Response} from "express";
import {get} from "../decorators/rest.decorator";
import {MyRouter} from "../types/my-router";
import {BaseRouter} from "./base";


export class ConfiguratorRouter extends BaseRouter implements MyRouter {
    public readonly urlPrefix: string = '/configurator';


    @get('/select-base/:baseName')
    private selectBase = (req: Request, res: Response): void => {
        const {baseName} = req.params as {
            baseName: string;
        };
        if (!(this.cmApp.data.COOKIE_BASES)[baseName]) {
            return this.cmApp.showErrorPage(res,
                `Oh no! There is no such base as ${baseName}.`);
        }
        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    };


    @get('/select-addon/:addonName')
    private selectAddon = (req: Request, res: Response): void => {
        const {addonName} = req.params as {
            addonName: string;
        };
        // if (!(this.cmApp.data.COOKIE_ADDONS as Record<string, number>)[addonName]) {
        // otypowałem w pliku "./data/cookies-data"
        if (!(this.cmApp.data.COOKIE_ADDONS)[addonName]) {
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


    @get('/remove-addon/:addonName')
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
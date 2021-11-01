const express = require('express');


class ConfiguratorRouter {
    constructor(cmApp) {
        this.cmApp = cmApp;
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/select-base/:baseName', this.selectBase);
        this.router.get('/select-addon/:addonName', this.selectAddon);
        this.router.get('/remove-addon/:addonName', this.removeAddon);
    }


    selectBase = (req, res) => {
        const {baseName} = req.params;
        if (!this.cmApp.data.COOKIE_BASES[baseName]) {
            return this.cmApp.showErrorPage(res,
                `Oh no! There is no such base as ${baseName}.`);
        }
        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    };

    selectAddon = (req, res) => {
        const {addonName} = req.params;
        if (!this.cmApp.data.COOKIE_ADDONS[addonName]) {
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

    removeAddon = (req, res) => {
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

module.exports = {
    ConfiguratorRouter,
}
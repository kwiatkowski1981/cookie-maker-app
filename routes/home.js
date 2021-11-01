const express = require('express');


class HomeRouter {
    constructor(cmApp) {
        this.cmApp = cmApp;
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/', this.home);
    }

    home = (req, res) => {
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


module.exports = {
    HomeRouter,
}
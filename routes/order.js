const express = require('express');


class OrderRouter {
    constructor(cmApp) {
        this.cmApp = cmApp;
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/summary', this.summary);
        this.router.get('/thanks', this.thanks);
    }


    summary = (req, res) => {
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

    thanks = (req, res) => {
        const {sum} = this.cmApp.getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            })
    };
}


module.exports = {
    OrderRouter,
}


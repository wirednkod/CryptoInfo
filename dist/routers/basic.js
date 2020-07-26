"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cryptoCache_1 = require("../cache/cryptoCache");
class BasicRouter {
    constructor() {
        this.path = '/api';
        this.router = express.Router();
        this.initRoutes = () => {
            this.router.get(`${this.path}/`, (req, res) => {
                const coinlist = cryptoCache_1.default.get('coinlist');
                res.send({ success: true, data: coinlist });
            });
        };
        this.initRoutes();
    }
}
exports.default = new BasicRouter().router;
//# sourceMappingURL=basic.js.map
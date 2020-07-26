"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class App {
    constructor(appInit) {
        this.srcpath = path.resolve('.');
        this.app = express();
        this.app.use(express.json());
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.routes);
        this.app.use(express.static(path.join(this.srcpath, 'client', 'build')));
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join(this.srcpath, 'client', 'build', 'index.html'));
        });
        this.assets();
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    routes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route);
        });
    }
    assets() {
        this.app.use(express.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
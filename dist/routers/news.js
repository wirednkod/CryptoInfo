"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios_1 = require("axios");
class NewsRouter {
    constructor() {
        this.path = '/news';
        this.router = express.Router();
        this.constructURL = () => {
            const cryptoPanicToken = 'ee15d08ee188634347cc4af7f2aad517a8c8a570';
            const cryptoPanicPath = 'https://cryptopanic.com/api/v1/';
            return `${cryptoPanicPath}/posts/?auth_token=${cryptoPanicToken}&public=true`;
        };
        this.initRoutes = () => {
            this.router.get(`${this.path}/get`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.get(this.constructURL());
                console.log('res', response.data);
                res.send({ success: true, data: response.data });
            }));
        };
        this.initRoutes();
    }
}
exports.default = new NewsRouter().router;
//# sourceMappingURL=news.js.map
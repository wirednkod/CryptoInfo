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
const cryptoCache_1 = require("../cache/cryptoCache");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
class GeckoRouter {
    constructor() {
        this.path = '/gecko';
        this.router = express.Router();
        this.initRoutes = () => {
            this.router.get(`${this.path}/global`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                let response;
                const globalData = cryptoCache_1.default.get('global');
                if (globalData) {
                    response = globalData;
                }
                else {
                    try {
                        response = yield CoinGeckoClient.global();
                        cryptoCache_1.default.set('global', response.data, 3600);
                    }
                    catch (err) {
                        console.log('err', err);
                    }
                }
                res.send(response);
            }));
            this.router.get(`${this.path}/coins/list`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                let response;
                const cachedCoinList = cryptoCache_1.default.get('coinlist');
                if (cachedCoinList) {
                    response = cachedCoinList;
                }
                else {
                    response = yield CoinGeckoClient.coins.list();
                    cryptoCache_1.default.set('coinlist', response.data, 3600);
                }
                res.send(response);
            }));
            this.router.get(`${this.path}/coins/markets`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                let response;
                const markets = cryptoCache_1.default.get('markets');
                if (markets) {
                    response = markets;
                }
                else {
                    response = yield CoinGeckoClient.coins.markets();
                    cryptoCache_1.default.set('markets', response.data, 60);
                }
                res.send(response);
            }));
        };
        this.initRoutes();
    }
}
exports.default = new GeckoRouter().router;
//# sourceMappingURL=gecko.js.map
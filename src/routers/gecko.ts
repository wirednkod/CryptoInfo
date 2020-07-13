import * as express from 'express'
import { Request, Response } from 'express'
import cryptoCache from '../cache/cryptoCache'

const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko()

class GeckoRouter {
    public path = '/gecko'

    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes = () => {
        this.router.get(`${this.path}/global`, async (req: Request, res: Response) => {
            let response
            const globalData = cryptoCache.get('global')
            if (globalData) {
                response = globalData
            } else {
                try {
                    response = await CoinGeckoClient.global()
                    cryptoCache.set('global', response.data, 3600)
                } catch (err) {
                    console.log('err', err)
                }
            }
            res.send(response)
        })

        this.router.get(`${this.path}/coins/list`, async (req: Request, res: Response) => {
            let response
            const cachedCoinList = cryptoCache.get('coinlist')
            if (cachedCoinList) {
                response = cachedCoinList
            } else {
                response = await CoinGeckoClient.coins.list()
                cryptoCache.set('coinlist', response.data, 3600)
            }
            res.send(response)
        })

        this.router.get(`${this.path}/coins/markets`, async (req: Request, res: Response) => {
            console.log('request on markets is', req)
            let response
            const markets = cryptoCache.get('markets')
            if (markets) {
                response = markets
            } else {
                response = await CoinGeckoClient.coins.markets()
                cryptoCache.set('markets', response.data, 60)
            }
            res.send(response)
        })
    }
}

export default new GeckoRouter().router

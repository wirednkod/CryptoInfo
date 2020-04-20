import * as express from 'express'
import { Request, Response } from 'express'

const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko()

class GeckoRouter {
    public path = '/gecko'

    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(`${this.path}/coins/list`, async (req: Request, res: Response) => {
            const data = await CoinGeckoClient.coins.list()
            res.send(data)
        })
    }
}

export default new GeckoRouter().router

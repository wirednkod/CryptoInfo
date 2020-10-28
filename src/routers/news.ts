import * as express from 'express'
import CryptoNewsApi from 'crypto-news-api'
import { Request, Response } from 'express'

const Api = new CryptoNewsApi('659325ef007aa3c653f985b63c293ee7')

class NewsRouter {
    public path = '/news'

    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes = () => {
        this.router.get(`${this.path}/get`, async (req: Request, res: Response) => {
            const response = await Api.getTopNews()
            res.send({ success: true, data: response })
        })
    }
}

export default new NewsRouter().router

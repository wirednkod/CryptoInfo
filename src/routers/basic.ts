import * as express from 'express'
import { Request, Response } from 'express'
import cryptoCache from '../cache/cryptoCache'

class BasicRouter {
    public path = '/api'

    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            const lala = cryptoCache.get('coinlist')
            res.send({ success: true, data: lala })
        })
    }
}

export default new BasicRouter().router

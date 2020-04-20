import * as express from 'express'
import { Request, Response } from 'express'

class BasicRouter {
    public path = '/api'

    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            res.send({ success: true, data: 'This is the basic route' })
        })
    }
}

export default new BasicRouter().router

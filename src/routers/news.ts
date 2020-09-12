import * as express from 'express'
import axios from 'axios'
import { Request, Response } from 'express'

class NewsRouter {
    public path = '/news'

    public router = express.Router()

    private constructURL = () : string => {
        const cryptoPanicToken = 'ee15d08ee188634347cc4af7f2aad517a8c8a570'
        const cryptoPanicPath = 'https://cryptopanic.com/api/v1/'
        return `${cryptoPanicPath}/posts/?auth_token=${cryptoPanicToken}&public=true`
    }

    constructor() {
        this.initRoutes()
    }

    public initRoutes = () => {
        this.router.get(`${this.path}/get`, async (req: Request, res: Response) => {
            const response = await axios.get(this.constructURL())
            res.send({ success: true, data: response.data })
        })
    }
}

export default new NewsRouter().router

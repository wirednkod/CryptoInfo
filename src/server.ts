import * as dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
// import { UpvestTenancyAPI } from '@upvest/tenancy-api'
import loggerMiddleware from './middleware/logger'
import BasicRouter from './routers/basic'
import GeckoRouter from './routers/gecko'
import NewsRouter from './routers/news'
import App from './app'

import config from '../config.js'

dotenv.config()

// const upvestConfig = {
//     baseURL: 'https://api-playground.eu.upvest.co/1.0/',
//     apikey: {
//         key: process.env.API_KEY,
//         secret: process.env.API_SECRET,
//         passphrase: process.env.API_PASSPHRASE,
//     },
// }

const app = new App({
    port: parseInt(config.port, 10),
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        cors(),
        helmet(),
        loggerMiddleware,
    ],
    routes: [
        BasicRouter,
        GeckoRouter,
        NewsRouter,
    ],
})

app.listen()

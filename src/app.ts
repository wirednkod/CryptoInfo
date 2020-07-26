import * as express from 'express'
import * as path from 'path'
import { Application } from 'express'

class App {
    public app: Application

    public port: number

    public srcpath = path.resolve('.')

    constructor(appInit: { port: number; middleWares: any; routes: any; }) {
        this.app = express()
        this.app.use(express.json())
        this.port = appInit.port
        this.middlewares(appInit.middleWares)
        this.routes(appInit.routes)
        this.app.use(express.static(path.join('client', 'build')))
        this.app.get('/*', (req, res) => {
            res.sendFile(path.join('client', 'build', 'index.html'))
        })
        this.assets()
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare)
        })
    }

    private routes(routes: { forEach: (arg0: (route: any) => void) => void; }) {
        routes.forEach((route) => {
            this.app.use('/', route)
        })
    }

    private assets() {
        this.app.use(express.static('public'))
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App

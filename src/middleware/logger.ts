import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    console.log('Request:', req.method, req.path)
    next()
}

export default loggerMiddleware

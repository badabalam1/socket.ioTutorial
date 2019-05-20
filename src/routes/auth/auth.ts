import { Response, Request, NextFunction } from 'express';

const auth = {
    Socket: async (req: Request, res: Response, next: NextFunction) => {
        return res.sendfile('./src/views/index.htm');
    }
}

export { auth }
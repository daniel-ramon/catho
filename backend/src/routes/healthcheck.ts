import { Router, Request, Response } from 'express';

class HealthCheck {
    static create() {
        const router = Router();
        router.get('/healthcheck', async (req: Request, res: Response) => {
            res.json({ status: 'ok' });
        })

        return router;
    }
}

export default HealthCheck;
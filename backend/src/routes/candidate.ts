import { Router, Request, Response, NextFunction } from 'express';
import { ILogger } from '../infra/modules/logger';
import { CandidateRepositoryFactory } from '../repositories';

class Candidate {
  static create(prefix: string, logger: ILogger) {
    const router = Router();
    const candidateRepository = CandidateRepositoryFactory.create(logger)

    router.post(`${prefix}/candidate`, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await candidateRepository.create(req.body);
        res.json({ data })
      } catch (err) {
        next(err);
      }
    })

    router.get(`${prefix}/candidates`, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await candidateRepository.get(req.query);
        res.json({ data })
      } catch (err) {
        next(err);
      }
    })

    return router;
  }
}

export default Candidate;
import { DatabaseFactory } from '../../infra';
import { ILogger } from '../../infra/modules/logger';
import { CandidateService } from '../modules/candidate';

class CandidateServiceFactory {
    static execute(logger: ILogger) {
        const database = DatabaseFactory.create('catho', logger);
        return new CandidateService(database, logger);
    }
}

export { CandidateServiceFactory };
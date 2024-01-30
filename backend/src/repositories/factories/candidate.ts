import { ILogger } from "../../infra/modules/logger";
import { CandidateServiceFactory } from "../../service";
import { CandidateRepository } from "../modules/candidate";

class CandidateRepositoryFactory {
  static create(logger: ILogger) {
    const candidateService = CandidateServiceFactory.execute(logger);
    return new CandidateRepository(
      candidateService,
      logger
    );
  }
}

export { CandidateRepositoryFactory };

import { ILogger } from "../../infra/modules/logger";
import { ICandidateService } from "../../service/modules/candidate";
import { ICandidate, INewCandidate } from "../../types/candidate";

interface ICandidateRepository {
  get(params: any): ICandidate[];
  create(candidate: INewCandidate): ICandidate;
}

class CandidateRepository implements CandidateRepository {
  logger: ILogger;
  candidateService: ICandidateService;

  constructor(
    candidateService: ICandidateService,
    logger: ILogger
  ) {
    this.logger = logger;
    this.candidateService = candidateService;
  }

  async get(params: any) {
    if(!params?.skills) {
      throw new Error('skills is required');
    }

    return await this.candidateService.getCandidates(params?.skills);
  }

  async create(candidate: INewCandidate) {
    return await this.candidateService.setCandidate(candidate);
  }
}

export { ICandidateRepository, CandidateRepository };

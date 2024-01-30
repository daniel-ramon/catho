import { IDatabase } from "../../infra/modules/database";
import { ILogger } from "../../infra/modules/logger";
import { INewCandidate } from "../../types/candidate";

interface ICandidateService {
  setCandidate(candidate: INewCandidate): Promise<any>;
  getCandidates(skills: string): Promise<any>;
}

class CandidateService implements ICandidateService {
  database: IDatabase;
  logger: ILogger;


  constructor(database: IDatabase, logger: ILogger) {
    this.database = database;
    this.logger = logger;
  }

  async setCandidate(candidate: INewCandidate) {
    try {
      const sql = "INSERT INTO candidates (name, skills) values(?, ?)";

      await this.database.execute(sql, [candidate.name, candidate.skills.toString()]);
      return { register: 'success' };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getCandidates(skills: string) {
    try {
      const skillsArray = skills.split(',');
      const sql = `SELECT * FROM candidates WHERE ${skillsArray.map(skill => `FIND_IN_SET('${skill.trim()}', skills) > 0`).join(' OR ')}`;
      const [rows] = await this.database.execute(sql, []);
      return rows;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export { CandidateService, ICandidateService };
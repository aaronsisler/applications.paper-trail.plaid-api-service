import { InstitutionDao } from "../data-access-layer/institution-dao";
import { Institution } from "../models/institution";

class InstitutionService {
  institutionDao: InstitutionDao;

  constructor() {
    this.institutionDao = new InstitutionDao();
  }

  async save(institution: Institution): Promise<Institution> {
    try {
      return await this.institutionDao.create(institution);
    } catch (error) {
      console.error("ERROR::InstitutionService::save");
      throw error;
    }
  }

  async get(
    userId: number,
    institutionIdentifier: string
  ): Promise<Institution | null> {
    try {
      return await this.institutionDao.read(userId, institutionIdentifier);
    } catch (error) {
      console.error("ERROR::InstitutionService::get");
      throw error;
    }
  }
}

export { InstitutionService };

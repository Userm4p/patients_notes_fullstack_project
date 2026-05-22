import { Patient } from '../models';

export class PatientsRepository {
  private readonly patientsModel: typeof Patient;

  constructor() {
    this.patientsModel = Patient;
  }

  public async getAllPatients() {
    return this.patientsModel.findAll();
  }

  public async getPatientById(id: string) {
    return this.patientsModel.findByPk(id);
  }
}

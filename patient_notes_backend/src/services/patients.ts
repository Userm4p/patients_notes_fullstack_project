import { PatientsRepository } from '../repository';

export class PatientsService {
  private readonly patientsRepository: PatientsRepository;

  constructor() {
    this.patientsRepository = new PatientsRepository();
  }

  public async getAllPatients() {
    return this.patientsRepository.getAllPatients();
  }

  public async getPatientById(id: string) {
    return this.patientsRepository.getPatientById(id);
  }
}

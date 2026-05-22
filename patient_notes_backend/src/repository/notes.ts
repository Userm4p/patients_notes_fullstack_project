import { Notes, Patient } from '../models';

export class NotesRepository {
  private readonly notesModel: typeof Notes;

  constructor() {
    this.notesModel = Notes;
  }

  public async getAllNotes() {
    return this.notesModel.findAll({
      include: {
        model: Patient,
        attributes: ['name'],
      },
    });
  }

  public async getNoteById(id: string) {
    return this.notesModel.findByPk(id, {
      include: {
        model: Patient,
      },
    });
  }

  public async getNotesByPatientId(patientId: string) {
    return this.notesModel.findAll({
      where: { patientId },
    });
  }

  public async createNote(content: string, patientId: string, summary: string, filePath?: string) {
    return this.notesModel.create({ content, patientId, summary, filePath });
  }
}

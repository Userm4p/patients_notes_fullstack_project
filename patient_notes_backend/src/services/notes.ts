import { envs, s3Client } from '../config';
import { NotesRepository, S3Repository } from '../repository';
import { aiSummaryGenerator, transcribeAudio } from '../utils';

export class NotesService {
  private readonly notesRepository: NotesRepository;
  private readonly s3Repository: S3Repository;

  constructor() {
    this.notesRepository = new NotesRepository();
    this.s3Repository = new S3Repository(s3Client);
  }

  public async getAllNotes() {
    return this.notesRepository.getAllNotes();
  }

  public async getNoteById(id: string) {
    const note = await this.notesRepository.getNoteById(id);

    if (note && note.filePath) {
      const signedUrl = await this.s3Repository.getSignedUrl(envs.audioBucketName!, note.filePath);
      return { ...note.toJSON(), fileUrl: signedUrl };
    }

    return note;
  }

  public async getNotesByPatientId(patientId: string) {
    return this.notesRepository.getNotesByPatientId(patientId);
  }

  public async createNote(content: string, patientId: string) {
    const summary = await aiSummaryGenerator(content);
    return this.notesRepository.createNote(content, patientId, summary);
  }

  public async createNoteFromAudio(audioBuffer: Buffer, patientId: string, fileType: string) {
    const content = await transcribeAudio(audioBuffer);
    if (!content) {
      throw new Error('Failed to transcribe audio or audio is empty');
    }
    const summary = await aiSummaryGenerator(content);
    const filePath = `notes/${patientId}/${Date.now()}.${fileType}`;
    await this.s3Repository.uploadFile(envs.audioBucketName!, filePath, audioBuffer, fileType);
    return this.notesRepository.createNote(content, patientId, summary, filePath);
  }
}

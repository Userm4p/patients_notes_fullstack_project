import { Router } from 'express';
import { NotesService } from '../services';
import { upload } from '../config';

const notesRouter = Router();
const notesService = new NotesService();
const SUPPORTED_AUDIO_TYPES = ['mp3', 'mp4', 'wav', 'm4a'];

notesRouter.get('/', async (_req, res) => {
  try {
    const notes = await notesService.getAllNotes();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

notesRouter.get('/:id', async (req, res) => {
  try {
    const note = await notesService.getNoteById(req.params.id);
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

notesRouter.get('/patient/:patientId', async (req, res) => {
  try {
    const notes = await notesService.getNotesByPatientId(req.params.patientId);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes for patient:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

notesRouter.post('/', async (req, res) => {
  try {
    const { content, patientId } = req.body;
    const newNote = await notesService.createNote(content, patientId);
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

notesRouter.post('/audio/:parentId', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
      });
    } 
    const { buffer, originalname } = req.file;
    const fileExtension = originalname.split('.').pop();

    if (!SUPPORTED_AUDIO_TYPES.includes(fileExtension!)) {
      return res.status(400).json({
        error: 'Unsupported file type. Please upload an audio file (mp3, mp4, wav, m4a).',
      });
    }

    const patientId = req.params.parentId; 

    const newNote = await notesService.createNoteFromAudio(
      Buffer.from(buffer),
      patientId as string,
      fileExtension!,
    );
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note from audio:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { notesRouter };

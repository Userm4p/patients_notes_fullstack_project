import { Router } from 'express';
import { patientsRouter } from './patients';
import { notesRouter } from './notes';

const router = Router();

router.use('/patients', patientsRouter);
router.use('/notes', notesRouter);

export { router };

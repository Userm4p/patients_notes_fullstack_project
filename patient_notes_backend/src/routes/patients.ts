import { Router } from 'express';
import { PatientsService } from '../services';

const patientsRouter = Router();

const patientsService = new PatientsService();

patientsRouter.get('/', async (_req, res) => {
  try {
    const patients = await patientsService.getAllPatients();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

patientsRouter.get('/:id', async (req, res) => {
  try {
    const patient = await patientsService.getPatientById(req.params.id);
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { patientsRouter };

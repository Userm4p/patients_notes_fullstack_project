import { Patient } from './models/Patients';

const mockPatients = [
  {
    id: '9c2a5d11-4d17-4a0f-b9f5-b8582452d2a1',
    name: 'Ana Torres',
    email: 'ana.torres@example.com',
    dob: '1991-04-12',
    documentId: 'ID-1001',
    phone: '+5491112345678',
  },
  {
    id: '59c0a53d-d5fb-4b7d-8724-a4bbcaf91f2f',
    name: 'Luis Herrera',
    email: 'luis.herrera@example.com',
    dob: '1987-11-03',
    documentId: 'ID-1002',
    phone: '+5491165432109',
  },
  {
    id: 'cd92b34b-4f9d-49b2-9840-b390e11d4d2e',
    name: 'Maria Gomez',
    email: 'maria.gomez@example.com',
    dob: '1995-07-28',
    documentId: 'ID-1003',
    phone: null,
  },
];

export async function seedDatabaseOnce(): Promise<void> {
  const patientCount = await Patient.count();

  if (patientCount > 0) {
    console.log('Seed skipped: patients already exist');
    return;
  }

  await Patient.bulkCreate(mockPatients);
  console.log('Seed completed: 3 mock patients inserted');
}

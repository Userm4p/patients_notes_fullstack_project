import type { Patient } from "./patients.types";

export const NoteCreation = {
  Text: "TEXT",
  Audio: "AUDIO",
} as const;

export type NoteCreationType = (typeof NoteCreation)[keyof typeof NoteCreation];

export interface Note {
  id: string;
  content: string;
  patientId: string;
  summary: string;
  filePath: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NoteWithPatientName extends Note {
  Patient?: {
    name: string;
  };
}

export interface NoteByIdResponse extends Note {
  Patient?: Patient;
  fileUrl?: string;
}

export interface CreateNotePayload {
  content: string;
  patientId: string;
}

export interface CreateNoteFromAudioPayload {
  patientId: string;
  audioFile: File;
}

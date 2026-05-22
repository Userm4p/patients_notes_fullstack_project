import type { Note, NoteByIdResponse, NoteWithPatientName } from "../types";
import client from "./client";

export const getNotes = async () => {
  return await client.get<NoteWithPatientName[]>("/notes");
};

export const getNoteById = async (id: string) => {
  return await client.get<NoteByIdResponse>(`/notes/${id}`);
};

export const getNotesByPatientId = async (patientId: string) => {
  return await client.get<Note[]>(`/notes/patient/${patientId}`);
};

export const createNote = async (content: string, patientId: string) => {
  return await client.post<Note>("/notes", { content, patientId });
};

export const createNoteFromAudio = async (
  audioFile: File,
  patientId: string,
) => {
  const formData = new FormData();
  formData.append("audio", audioFile);
  return await client.post<Note>(`/notes/audio/${patientId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

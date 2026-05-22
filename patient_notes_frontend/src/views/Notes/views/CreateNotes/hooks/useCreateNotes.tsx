import { useMemo, useState } from "react";
import {
  createNote,
  createNoteFromAudio,
  NoteCreation,
  type Note,
  type NoteCreationType,
} from "../../../../../common";

export const useCreateNotes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [note, setNote] = useState<string>("");
  const [noteAudio, setNoteAudio] = useState<File | null>(null);
  const [noteType, setNoteType] = useState<NoteCreationType>(NoteCreation.Text);
  const [patientId, setPatientId] = useState<string>("");

  const handleNoteTypeChange = (type: NoteCreationType) => {
    setNoteType(type);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNoteAudio(e.target.files[0]);
    }
  };

  const handleSelectPatient = (id: string) => {
    setPatientId(id);
  };

  const handleSubmit = async (): Promise<Note | null> => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (noteType === NoteCreation.Audio) {
        const { data } = await createNoteFromAudio(noteAudio as File, patientId);
        setSuccess("Note created successfully from audio!");
        return data;
      }

      const { data } = await createNote(note, patientId);
      setSuccess("Note created successfully!");
      return data;
    } catch {
      setError("Failed to create note. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = useMemo(() => {
    if (noteType === NoteCreation.Audio) {
      return !!noteAudio && !!patientId;
    }
    return !!note && !!patientId;
  }, [noteType, note, noteAudio, patientId]);

  return {
    loading,
    error,
    success,
    note,
    noteType,
    patientId,
    handleNoteTypeChange,
    handleNoteChange,
    handleAudioChange,
    handleSelectPatient,
    handleSubmit,
    isFormValid,
  };
};

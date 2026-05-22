import { useState } from "react";
import { getNoteById, type NoteByIdResponse } from "../../../../../common";

export const useNoteById = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [note, setNote] = useState<NoteByIdResponse | null>(null);

  const getNote = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getNoteById(id);
      setNote(data);
    } catch {
      setError("Failed to fetch note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    note,
    getNote,
  };
};

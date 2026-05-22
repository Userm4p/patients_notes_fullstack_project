import { useState } from "react";
import { getNotes, type NoteWithPatientName } from "../../../../../common";

export const useNotes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notes, setNotes] = useState<NoteWithPatientName[]>([]);

  const getAllNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getNotes();
      setNotes(data);
    } catch {
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    notes,
    getAllNotes,
  };
};

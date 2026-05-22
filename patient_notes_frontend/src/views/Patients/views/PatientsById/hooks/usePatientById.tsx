import { useState } from "react";
import { getPatientById, type Patient } from "../../../../../common";

export const usePatientById = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [patient, setPatient] = useState<Patient | null>(null);

  const getPatient = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getPatientById(id);
      setPatient(data);
    } catch {
      setError("Failed to fetch patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    patient,
    getPatient,
  };
};
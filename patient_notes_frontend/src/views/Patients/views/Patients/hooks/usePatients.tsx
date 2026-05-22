import { useState } from "react";
import { getPatients, type Patient } from "../../../../../common";

export const usePatients = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [patients, setPatients] = useState<Patient[]>([]);

  const getAllPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getPatients();
      setPatients(data);
    } catch {
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    patients,
    getAllPatients,
  };
};
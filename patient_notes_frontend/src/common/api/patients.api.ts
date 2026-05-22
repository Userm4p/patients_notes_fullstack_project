import type { Patient } from "../types";
import client from "./client";

export const getPatients = async () => {
  return await client.get<Patient[]>("/patients");
};

export const getPatientById = async (id: string) => {
  return await client.get<Patient>(`/patients/${id}`);
};

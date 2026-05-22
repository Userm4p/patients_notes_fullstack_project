import { Route, Routes } from "react-router";
import { Patients, PatientsById } from "./views";

export const PatientsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Patients />} />
      <Route path="/:id" element={<PatientsById />} />
    </Routes>
  );
};

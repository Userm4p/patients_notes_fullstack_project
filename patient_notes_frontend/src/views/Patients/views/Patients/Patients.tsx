import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../../../common";
import { usePatients } from "./hooks/usePatients";

export const Patients = () => {
  const navigate = useNavigate();
  const { loading, error, patients, getAllPatients } = usePatients();

  useEffect(() => {
    void getAllPatients();
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Patients</h2>
        <p className="text-sm text-slate-600">Select a patient to view details and create notes.</p>
      </div>

      {loading && <p className="text-sm text-slate-600">Loading patients...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && patients.length === 0 && (
        <p className="text-sm text-slate-600">No patients found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            title={patient.name}
            subtitle={patient.email}
            onClick={() => navigate(`/patients/${patient.id}`)}
            footer={<span className="text-xs font-medium text-slate-500">Document: {patient.documentId}</span>}
          >
            <p>
              <span className="font-semibold">Phone:</span> {patient.phone || "Not provided"}
            </p>
            <p className="mt-1">
              <span className="font-semibold">DOB:</span> {patient.dob}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

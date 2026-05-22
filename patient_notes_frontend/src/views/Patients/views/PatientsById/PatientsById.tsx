import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../../../../common";
import { usePatientById } from "./hooks/usePatientById";

export const PatientsById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, patient, getPatient } = usePatientById();

  useEffect(() => {
    if (!id) {
      return;
    }

    void getPatient(id);
  }, [id]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Patient Detail</h2>
          <p className="text-sm text-slate-600">Review patient info and create a new note.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!id) {
              return;
            }
            navigate(`/notes/create?patientId=${id}`);
          }}
          disabled={!id}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Create Note
        </button>
      </div>

      {loading && <p className="text-sm text-slate-600">Loading patient...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && !patient && (
        <p className="text-sm text-slate-600">Patient not found.</p>
      )}

      {patient && (
        <Card title={patient.name} subtitle={patient.email}>
          <div className="grid gap-2 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Patient ID:</span> {patient.id}
            </p>
            <p>
              <span className="font-semibold">Document:</span> {patient.documentId}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {patient.phone || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">DOB:</span> {patient.dob}
            </p>
          </div>
        </Card>
      )}
    </section>
  );
};

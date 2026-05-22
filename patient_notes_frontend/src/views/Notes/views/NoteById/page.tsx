import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Card } from "../../../../common";
import { useNoteById } from "./hooks/useNoteById";

export const NoteById = () => {
  const { id } = useParams();
  const { loading, error, note, getNote } = useNoteById();

  useEffect(() => {
    if (!id) {
      return;
    }

    void getNote(id);
  }, [id]);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Note Detail</h2>
        <p className="text-sm text-slate-600">Review the full note and linked patient information.</p>
      </div>

      {loading && <p className="text-sm text-slate-600">Loading note...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && !note && <p className="text-sm text-slate-600">Note not found.</p>}

      {note && (
        <div className="space-y-4">
          <Card
            title={note.Patient?.name || "Unknown patient"}
            subtitle={`Created at ${new Date(note.createdAt).toLocaleString()}`}
          >
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Note ID:</span> {note.id}
              </p>
              <p>
                <span className="font-semibold">Patient ID:</span> {note.patientId}
              </p>
              <p>
                <span className="font-semibold">Summary:</span> {note.summary}
              </p>
              <p>
                <span className="font-semibold">Content:</span> {note.content}
              </p>
              {note.fileUrl && (
                <p>
                  <span className="font-semibold">Audio:</span>{" "}
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 underline hover:text-sky-700"
                  >
                    Open audio file
                  </a>
                </p>
              )}
            </div>
          </Card>

          {note.Patient && (
            <Card
              title="Patient Information"
              footer={
                <Link
                  to={`/patients/${note.Patient.id}`}
                  className="inline-flex rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  Open patient detail
                </Link>
              }
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <p>
                  <span className="font-semibold">Name:</span> {note.Patient.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {note.Patient.email}
                </p>
                <p>
                  <span className="font-semibold">Document:</span> {note.Patient.documentId}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {note.Patient.phone || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">DOB:</span> {note.Patient.dob}
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </section>
  );
};

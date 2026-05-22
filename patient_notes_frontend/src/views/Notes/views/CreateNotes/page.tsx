import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { NoteCreation } from "../../../../common";
import { useCreateNotes } from "./hooks/useCreateNotes";

export const CreateNotes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientIdParam = searchParams.get("patientId") || "";

  const {
    loading,
    error,
    note,
    noteType,
    patientId,
    handleNoteTypeChange,
    handleNoteChange,
    handleAudioChange,
    handleSelectPatient,
    handleSubmit,
    isFormValid,
  } = useCreateNotes();

  useEffect(() => {
    if (!patientIdParam) {
      return;
    }

    handleSelectPatient(patientIdParam);
  }, [patientIdParam]);

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const createdNote = await handleSubmit();
    if (createdNote?.id) {
      navigate(`/notes/${createdNote.id}`);
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create Note</h2>
        <p className="text-sm text-slate-600">Complete the form to create a note for the selected patient.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block space-y-1">
          <span className="text-sm font-semibold text-slate-700">Patient ID</span>
          <input
            type="text"
            value={patientId}
            onChange={(e) => handleSelectPatient(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Enter patient id"
          />
        </label>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Note type</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleNoteTypeChange(NoteCreation.Text)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                noteType === NoteCreation.Text
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Text
            </button>
            <button
              type="button"
              onClick={() => handleNoteTypeChange(NoteCreation.Audio)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                noteType === NoteCreation.Audio
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Audio
            </button>
          </div>
        </div>

        {noteType === NoteCreation.Text ? (
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-slate-700">Content</span>
            <textarea
              value={note}
              onChange={handleNoteChange}
              rows={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Write your note content"
            />
          </label>
        ) : (
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-slate-700">Audio file</span>
            <input
              type="file"
              accept=".mp3,.mp4,.wav,.m4a"
              onChange={handleAudioChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </section>
  );
};

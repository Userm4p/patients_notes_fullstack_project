import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../../../common";
import { useNotes } from "./hooks/useNotes";

type SortDirection = "asc" | "desc";

export const Notes = () => {
  const navigate = useNavigate();
  const { loading, error, notes, getAllNotes } = useNotes();

  const [patientFilter, setPatientFilter] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    void getAllNotes();
  }, []);

  const patientOptions = useMemo(() => {
    const map = new Map<string, string>();

    notes.forEach((note) => {
      map.set(note.patientId, note.Patient?.name || "Unknown patient");
    });

    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [notes]);

  const filteredAndSortedNotes = useMemo(() => {
    const filtered =
      patientFilter === "all"
        ? notes
        : notes.filter((note) => note.patientId === patientFilter);

    return [...filtered].sort((a, b) => {
      const patientA = a.Patient?.name || "";
      const patientB = b.Patient?.name || "";
      const compare = patientA.localeCompare(patientB);
      return sortDirection === "asc" ? compare : compare * -1;
    });
  }, [notes, patientFilter, sortDirection]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notes</h2>
          <p className="text-sm text-slate-600">Browse all notes and open a note to view full details.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Filter by patient
            <select
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-700"
            >
              <option value="all">All patients</option>
              {patientOptions.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Order by patient
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as SortDirection)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-700"
            >
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </label>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-600">Loading notes...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && filteredAndSortedNotes.length === 0 && (
        <p className="text-sm text-slate-600">No notes found for the selected filter.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAndSortedNotes.map((note) => (
          <Card
            key={note.id}
            title={note.Patient?.name || "Unknown patient"}
            subtitle={`Created: ${new Date(note.createdAt).toLocaleDateString()}`}
            onClick={() => navigate(`/notes/${note.id}`)}
            footer={<span className="text-xs font-medium text-slate-500">Click to open note detail</span>}
          >
            <p className="line-clamp-3">{note.summary}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

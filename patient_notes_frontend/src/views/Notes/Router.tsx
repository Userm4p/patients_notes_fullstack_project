import { Route, Routes } from "react-router";
import { Notes, NoteById, CreateNotes } from "./views";

export const NotesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
      <Route path="/:id" element={<NoteById />} />
      <Route path="/create" element={<CreateNotes />} />
    </Routes>
  );
};

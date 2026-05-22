import { Navigate, Outlet, Route, Routes } from "react-router";
import { AppLayout } from "./common";
import { NotesRouter, PatientsRouter } from "./views";

const Router = () => {
  return (
    <Routes>
      <Route
        element={(
          <AppLayout>
            <Outlet />
          </AppLayout>
        )}
      >
        <Route index element={<Navigate to="/notes" replace />} />
        <Route path="/notes/*" element={<NotesRouter />} />
        <Route path="/patients/*" element={<PatientsRouter />} />
        <Route path="*" element={<Navigate to="/notes" replace />} />
      </Route>
    </Routes>
  );
};

export default Router;

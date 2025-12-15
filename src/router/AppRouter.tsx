import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ListMouvementsPage from '../pages/ListMouvementsPage';
import AddMouvementPage from '../pages/AddMouvementPage';
import EditMouvementPage from '../pages/EditMouvementPage';
import Menu from '../components/Menu';
import { useAuth } from '../context/AuthContext';

export default function AppRouter({
  setLocale,
}: {
  setLocale: (lang: 'fr' | 'en') => void;
}) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      /* ROUTES PROTEGES */
      <Route
        path="/"
        element={
          <RequireAuth>
            <Menu setLocale={setLocale} />
          </RequireAuth>
        }
      >
        <Route index element={<ListMouvementsPage />} />
        <Route path="add" element={<AddMouvementPage />} />
        <Route path="edit/:id" element={<EditMouvementPage />} />
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <LoginPage />;
}

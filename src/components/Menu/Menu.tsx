import { Link, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MenuProps {
  setLocale: (locale: 'fr' | 'en') => void;
}

export default function Menu({ setLocale }: MenuProps) {
  const { logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition ${
      isActive ? 'text-yellow-300' : 'text-white hover:text-yellow-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow-lg border-b border-gray-700">
        <h2 className="text-xl font-bold text-blue-400">
          Gestion des mouvements
        </h2>

        <div className="flex items-center gap-4">
          <NavLink to="/" className={linkClass}>
            Liste
          </NavLink>

          <NavLink to="/add" className={linkClass}>
            Ajouter
          </NavLink>

          <div className="flex gap-1">
            <button
              onClick={() => setLocale('fr')}
              className="rounded bg-gray-700 px-2 py-1 text-sm font-bold hover:bg-gray-600 transition"
            >
              FR
            </button>
            <button
              onClick={() => setLocale('en')}
              className="rounded bg-gray-700 px-2 py-1 text-sm font-bold hover:bg-gray-600 transition"
            >
              EN
            </button>
          </div>

          <button
            onClick={logout}
            className="rounded bg-red-600 px-3 py-1 text-sm font-bold hover:bg-red-700 transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

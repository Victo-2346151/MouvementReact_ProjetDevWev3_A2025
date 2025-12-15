import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FormattedMessage } from 'react-intl';

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
        {/* Titre */}
        <h2 className="text-xl font-bold text-blue-400">
          <FormattedMessage
            id="app.title"
            defaultMessage="Gestion des mouvements"
          />
        </h2>

        <div className="flex items-center gap-4">
          {/* Liens */}
          <NavLink to="/" className={linkClass}>
            <FormattedMessage id="menu.list" defaultMessage="Liste" />
          </NavLink>

          <NavLink to="/add" className={linkClass}>
            <FormattedMessage id="menu.add" defaultMessage="Ajouter" />
          </NavLink>

          {/* Sélecteur de langue */}
          <div className="flex gap-1">
            <button
              onClick={() => setLocale('fr')}
              className="rounded bg-gray-700 px-2 py-1 text-sm font-bold hover:bg-gray-600 transition"
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => setLocale('en')}
              className="rounded bg-gray-700 px-2 py-1 text-sm font-bold hover:bg-gray-600 transition"
              title="English"
            >
              EN
            </button>
          </div>

          <button
            onClick={logout}
            className="rounded bg-red-600 px-3 py-1 text-sm font-bold hover:bg-red-700 transition"
          >
            <FormattedMessage id="menu.logout" defaultMessage="Déconnexion" />
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FormattedMessage } from 'react-intl';

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const ok = await login(email, password);

    setLoading(false);

    if (!ok) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* Titre */}
      <h1 className="mb-8 text-center text-4xl font-bold text-blue-400 drop-shadow">
        <FormattedMessage id="login.title" defaultMessage="Connexion" />
      </h1>

      {/* Carte */}
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-600 bg-gray-700 p-2 text-white outline-none transition focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-gray-600 bg-gray-700 p-2 text-white outline-none transition focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded py-2 font-bold text-white transition ${
              loading
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              'Connexion...'
            ) : (
              <FormattedMessage
                id="login.button"
                defaultMessage="Se connecter"
              />
            )}
          </button>
        </form>

        {/* Erreur */}
        {error && (
          <p className="mt-4 text-center font-semibold text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}

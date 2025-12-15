import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface IMouvement {
  _id: string;
  reference: string;
  produit: string;
  quantite: number;
  urgent: boolean;
  typeOperation: string;
}

export default function ListMouvementsPage() {
  const [mouvements, setMouvements] = useState<IMouvement[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeOperation, setTypeOperation] = useState<
    'all' | 'entree' | 'sortie'
  >('all');
  const [urgent, setUrgent] = useState<'all' | 'oui' | 'non'>('all');

  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/mouvements', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error('Erreur API :', res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMouvements(data.mouvements);
      setLoading(false);
    }

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <p className="text-center text-gray-300 mt-20 text-xl">Chargement...</p>
    );
  }

  const mouvementsFiltres = mouvements.filter((m) => {
    const matchType =
      typeOperation === 'all' || m.typeOperation === typeOperation;

    const matchUrgent =
      urgent === 'all' ||
      (urgent === 'oui' && m.urgent) ||
      (urgent === 'non' && !m.urgent);

    return matchType && matchUrgent;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
        <FormattedMessage
          id="mouvements.list"
          defaultMessage="Liste des mouvements"
        />
      </h1>

      <div className="max-w-4xl mx-auto mb-8 rounded-lg bg-gray-800 p-4 shadow">
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block mb-1 text-sm text-gray-400">
              Opération
            </label>
            <select
              value={typeOperation}
              onChange={(e) =>
                setTypeOperation(e.target.value as 'all' | 'entree' | 'sortie')
              }
              className="rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="all">Toutes</option>
              <option value="entree">Entrée</option>
              <option value="sortie">Sortie</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Urgent</label>
            <select
              value={urgent}
              onChange={(e) =>
                setUrgent(e.target.value as 'all' | 'oui' | 'non')
              }
              className="rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="all">Tous</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mouvementsFiltres.map((m) => (
          <div
            key={m._id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg transition hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-300">
              {m.reference}
            </h3>

            <p className="text-gray-300">
              <span className="font-semibold">Produit :</span> {m.produit}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Quantité :</span> {m.quantite}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Opération :</span>{' '}
              {m.typeOperation}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Urgent :</span>{' '}
              {m.urgent ? (
                <span className="text-red-400 font-bold">Oui</span>
              ) : (
                'Non'
              )}
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to={`/edit/${m._id}`}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
              >
                Modifier
              </Link>

              <button
                onClick={async () => {
                  if (!confirm('Voulez-vous vraiment supprimer ?')) return;

                  const res = await fetch(
                    `http://localhost:3000/api/mouvements/${m._id}`,
                    {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );

                  if (res.ok) {
                    setMouvements((prev) =>
                      prev.filter((x) => x._id !== m._id),
                    );
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-white font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

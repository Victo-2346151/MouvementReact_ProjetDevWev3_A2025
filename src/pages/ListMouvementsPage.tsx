import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { getMouvements, deleteMouvement } from '../api/api';

interface IMouvement {
  _id: string;
  reference: string;
  produit: string;
  quantite: number;
  urgent: boolean;
  typeOperation: string;
}

export default function ListMouvementsPage() {
  const intl = useIntl();

  const [mouvements, setMouvements] = useState<IMouvement[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeOperation, setTypeOperation] = useState<
    'all' | 'entree' | 'sortie'
  >('all');
  const [urgent, setUrgent] = useState<'all' | 'oui' | 'non'>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMouvements();
        setMouvements(data);
      } catch (err) {
        console.error('Erreur API mouvements', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-300 mt-20 text-xl">
        <FormattedMessage id="loading" defaultMessage="Chargement..." />
      </p>
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
        <FormattedMessage id="mouvements.list" />
      </h1>

      {/* Filtres */}
      <div className="max-w-4xl mx-auto mb-8 rounded-lg bg-gray-800 p-4 shadow">
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="block mb-1 text-sm text-gray-400">
              <FormattedMessage id="filters.operation" />
            </label>
            <select
              value={typeOperation}
              onChange={(e) =>
                setTypeOperation(e.target.value as 'all' | 'entree' | 'sortie')
              }
              className="rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="all">
                <FormattedMessage id="filters.all" />
              </option>
              <option value="entree">
                <FormattedMessage id="type.entree" />
              </option>
              <option value="sortie">
                <FormattedMessage id="type.sortie" />
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">
              <FormattedMessage id="filters.urgent" />
            </label>
            <select
              value={urgent}
              onChange={(e) =>
                setUrgent(e.target.value as 'all' | 'oui' | 'non')
              }
              className="rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="all">
                <FormattedMessage id="filters.all" />
              </option>
              <option value="oui">
                <FormattedMessage id="filters.yes" />
              </option>
              <option value="non">
                <FormattedMessage id="filters.no" />
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste */}
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
              <strong>
                <FormattedMessage id="fields.produit" /> :
              </strong>{' '}
              {m.produit}
            </p>

            <p className="text-gray-300">
              <strong>
                <FormattedMessage id="fields.quantite" /> :
              </strong>{' '}
              {m.quantite}
            </p>

            <p className="text-gray-300">
              <strong>
                <FormattedMessage id="fields.typeOperation" /> :
              </strong>{' '}
              <FormattedMessage id={`type.${m.typeOperation}`} />
            </p>

            <p className="text-gray-300">
              <strong>
                <FormattedMessage id="fields.urgent" /> :
              </strong>{' '}
              <FormattedMessage id={m.urgent ? 'filters.yes' : 'filters.no'} />
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to={`/edit/${m._id}`}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
              >
                <FormattedMessage id="actions.edit" defaultMessage="Modifier" />
              </Link>

              <button
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    intl.formatMessage({
                      id: 'confirm.delete',
                      defaultMessage:
                        'Voulez-vous vraiment supprimer ce mouvement ?',
                    }),
                  );

                  if (!confirmDelete) return;

                  await deleteMouvement(m._id);
                  setMouvements((prev) => prev.filter((x) => x._id !== m._id));
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-white font-semibold"
              >
                <FormattedMessage id="actions.delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMouvement } from '../api/api';
import { FormattedMessage, useIntl } from 'react-intl';

export default function AddMouvementPage() {
  const navigate = useNavigate();
  const intl = useIntl();

  const [reference, setReference] = useState('');
  const [typeOperation, setTypeOperation] = useState('entree');
  const [produit, setProduit] = useState('');
  const [entrepot, setEntrepot] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [urgent, setUrgent] = useState(false);
  const [dateOperation, setDateOperation] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!entrepot) {
      setError(
        intl.formatMessage({
          id: 'add.error.entrepot',
          defaultMessage: 'Veuillez sélectionner un entrepôt.',
        }),
      );
      return;
    }

    const mouvement = {
      reference,
      typeOperation,
      produit,
      entrepot,
      quantite,
      urgent,
      dateOperation: new Date(dateOperation).toISOString(),
      commentaire,
      tags: tags.trim() === '' ? [] : tags.split(',').map((t) => t.trim()),
    };

    try {
      await addMouvement(mouvement);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        intl.formatMessage({
          id: 'add.error.api',
          defaultMessage: 'Erreur lors de l’ajout du mouvement',
        }),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
        <FormattedMessage
          id="add.title"
          defaultMessage="Ajouter un mouvement"
        />
      </h1>

      <div className="bg-gray-800 w-full max-w-2xl p-8 rounded-lg shadow-xl border border-gray-700">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Référence */}
          <div>
            <label htmlFor="reference" className="font-semibold">
              <FormattedMessage
                id="fields.reference"
                defaultMessage="Référence"
              />
            </label>
            <input
              id="reference"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          {/* Type d’opération */}
          <div>
            <label htmlFor="typeOperation" className="font-semibold">
              <FormattedMessage
                id="fields.typeOperation"
                defaultMessage="Type d’opération"
              />
            </label>
            <select
              id="typeOperation"
              value={typeOperation}
              onChange={(e) => setTypeOperation(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            >
              <option value="entree">
                <FormattedMessage id="type.entree" defaultMessage="Entrée" />
              </option>
              <option value="sortie">
                <FormattedMessage id="type.sortie" defaultMessage="Sortie" />
              </option>
            </select>
          </div>

          {/* Produit */}
          <div>
            <label htmlFor="produit" className="font-semibold">
              <FormattedMessage id="fields.produit" defaultMessage="Produit" />
            </label>
            <input
              id="produit"
              type="text"
              value={produit}
              onChange={(e) => setProduit(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          {/* Entrepôt */}
          <div>
            <label htmlFor="entrepot" className="font-semibold">
              <FormattedMessage
                id="fields.entrepot"
                defaultMessage="Entrepôt"
              />
            </label>
            <select
              id="entrepot"
              value={entrepot}
              onChange={(e) => setEntrepot(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              required
            >
              <option value="">
                <FormattedMessage
                  id="fields.entrepot.choose"
                  defaultMessage="-- Choisir un entrepôt --"
                />
              </option>
              <option value="Central">Central</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
              <option value="Nord">Nord</option>
            </select>
          </div>

          {/* Quantité */}
          <div>
            <label htmlFor="quantite" className="font-semibold">
              <FormattedMessage
                id="fields.quantite"
                defaultMessage="Quantité"
              />
            </label>
            <input
              id="quantite"
              type="number"
              min={1}
              value={quantite}
              onChange={(e) => setQuantite(Number(e.target.value))}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          {/* Urgent */}
          <div className="flex items-center gap-3">
            <input
              id="urgent"
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="h-4 w-4 accent-red-500"
            />
            <label htmlFor="urgent" className="font-semibold">
              <FormattedMessage id="fields.urgent" defaultMessage="Urgent" />
            </label>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="dateOperation" className="font-semibold">
              <FormattedMessage
                id="fields.dateOperation"
                defaultMessage="Date d’opération"
              />
            </label>
            <input
              id="dateOperation"
              type="datetime-local"
              value={dateOperation}
              onChange={(e) => setDateOperation(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              max={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>

          {/* Commentaire */}
          <div>
            <label htmlFor="commentaire" className="font-semibold">
              <FormattedMessage
                id="fields.commentaire"
                defaultMessage="Commentaire"
              />
            </label>
            <textarea
              id="commentaire"
              rows={3}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="font-semibold">
              <FormattedMessage
                id="fields.tags"
                defaultMessage="Tags (séparés par des virgules)"
              />
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
            >
              <FormattedMessage id="actions.cancel" defaultMessage="Annuler" />
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              <FormattedMessage id="actions.add" defaultMessage="Ajouter" />
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-center mt-4 font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

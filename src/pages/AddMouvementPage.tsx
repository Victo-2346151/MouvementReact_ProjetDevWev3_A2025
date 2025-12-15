import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addMouvement } from '../api/api';
import { FormattedMessage } from 'react-intl';

export default function AddMouvementPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

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

    // Validation simple
    if (!entrepot) {
      setError('Veuillez sélectionner un entrepôt.');
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
      await addMouvement(token!, mouvement);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l’ajout du mouvement');
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
          <div>
            <label htmlFor="reference" className="font-semibold">
              Référence
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
              Type d’opération
            </label>
            <select
              id="typeOperation"
              value={typeOperation}
              onChange={(e) => setTypeOperation(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            >
              <option value="entree">Entrée</option>
              <option value="sortie">Sortie</option>
            </select>
          </div>

          <div>
            <label htmlFor="produit" className="font-semibold">
              Produit
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

          <div>
            <label htmlFor="entrepot" className="font-semibold">
              Entrepôt
            </label>
            <select
              id="entrepot"
              value={entrepot}
              onChange={(e) => setEntrepot(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
              required
            >
              <option value="">-- Choisir un entrepôt --</option>
              <option value="Central">Central</option>
              <option value="Est">Est</option>
              <option value="Ouest">Ouest</option>
              <option value="Nord">Nord</option>
            </select>
          </div>

          <div>
            <label htmlFor="quantite" className="font-semibold">
              Quantité
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

          <div className="flex items-center gap-3">
            <input
              id="urgent"
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="h-4 w-4 accent-red-500"
            />
            <label htmlFor="urgent" className="font-semibold">
              Urgent
            </label>
          </div>

          <div>
            <label htmlFor="dateOperation" className="font-semibold">
              Date d’opération
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

          <div>
            <label htmlFor="commentaire" className="font-semibold">
              Commentaire
            </label>
            <textarea
              id="commentaire"
              rows={3}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="tags" className="font-semibold">
              Tags (séparés par des virgules)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 p-2 w-full rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Ajouter
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

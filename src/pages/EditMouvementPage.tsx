import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMouvementById, updateMouvement } from '../api/api';
import { FormattedMessage } from 'react-intl';

export default function EditMouvementPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [reference, setReference] = useState('');
  const [typeOperation, setTypeOperation] = useState('entree');
  const [produit, setProduit] = useState('');
  const [entrepot, setEntrepot] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [urgent, setUrgent] = useState(false);
  const [dateOperation, setDateOperation] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const [error, setError] = useState('');

  /* Charger le mouvement existant */
  useEffect(() => {
    async function fetchData() {
      try {
        const mouv = await getMouvementById(id!);

        setReference(mouv.reference);
        setTypeOperation(mouv.typeOperation);
        setProduit(mouv.produit);
        setEntrepot(mouv.entrepot);
        setQuantite(mouv.quantite);
        setUrgent(mouv.urgent);

        const iso = new Date(mouv.dateOperation).toISOString().slice(0, 16);
        setDateOperation(iso);

        setCommentaire(mouv.commentaire || '');
      } catch (err) {
        setError('Erreur lors du chargement du mouvement');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, token]);

  /* Soumettre la modification */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation : date future interdite
    const now = new Date();
    const dateToSend = new Date(dateOperation);

    if (dateToSend > now) {
      setError('La date ne peut pas être dans le futur. Veuillez la corriger.');
      return;
    }

    const movementToSend = {
      reference,
      typeOperation,
      produit,
      entrepot,
      quantite,
      urgent,
      dateOperation: dateToSend.toISOString(),
      commentaire,
    };

    try {
      await updateMouvement(id!, movementToSend);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la modification');
    }
  };

  if (loading) {
    return (
      <p className="text-white text-center mt-20 text-xl">Chargement...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
        <FormattedMessage
          id="edit.title"
          defaultMessage="Modifier un mouvement"
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
            >
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
          =
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
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Enregistrer
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

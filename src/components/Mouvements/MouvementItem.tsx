import { Link } from 'react-router-dom';
import type { IMouvement } from '../Mouvements/types';

export default function MouvementItem({
  mouvement,
}: {
  mouvement: IMouvement;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 shadow-lg ring-1 ring-slate-700 transition hover:ring-blue-500">
      <h3 className="mb-4 text-2xl font-bold text-blue-400">
        {mouvement.reference}
      </h3>

      <div className="space-y-1 text-slate-200">
        <p>
          <span className="font-semibold text-slate-400">Produit :</span>{' '}
          {mouvement.produit}
        </p>

        <p>
          <span className="font-semibold text-slate-400">Quantité :</span>{' '}
          {mouvement.quantite}
        </p>

        <p>
          <span className="font-semibold text-slate-400">Opération :</span>{' '}
          {mouvement.typeOperation}
        </p>

        <p>
          <span className="font-semibold text-slate-400">Urgent :</span>{' '}
          {mouvement.urgent ? (
            <span className="font-bold text-red-400">Oui</span>
          ) : (
            <span className="text-green-400">Non</span>
          )}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/edit/${mouvement._id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Modifier
        </Link>
      </div>
    </div>
  );
}

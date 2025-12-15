import MouvementItem from '../Mouvements/MouvementItem';
import type { IMouvement } from '../Mouvements/types';

export default function ListeMouvements({
  mouvements,
}: {
  mouvements: IMouvement[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mouvements.map((m) => (
        <MouvementItem key={m._id} mouvement={m} />
      ))}
    </div>
  );
}

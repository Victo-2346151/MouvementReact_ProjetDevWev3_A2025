export interface IMouvement {
  _id: string;
  reference: string;
  produit: string;
  quantite: number;
  urgent: boolean;
  typeOperation: string;
}

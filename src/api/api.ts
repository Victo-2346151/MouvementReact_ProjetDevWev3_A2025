import axios from 'axios';

// ===============================
// CONFIG AXIOS
// ===============================
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===============================
// API MOUVEMENTS
// ===============================

// GET tous les mouvements
export async function getMouvements(token: string) {
  const res = await api.get('/mouvements');
  return res.data.mouvements;
}

// GET par ID
export async function getMouvementById(token: string, id: string) {
  const res = await api.get(`/mouvements/${id}`);
  return res.data.mouvement;
}

// POST ajouter
export async function addMouvement(token: string, mouvement: any) {
  try {
    const res = await api.post('/mouvements', mouvement);
    return res.data.mouvement;
  } catch (err: any) {
    console.error('Erreur API Add :', err.response?.data || err);
    throw new Error('Erreur API lors de la création du mouvement');
  }
}

// PUT modifier
export async function updateMouvement(
  token: string,
  id: string,
  mouvement: any,
) {
  try {
    const res = await api.put(`/mouvements/${id}`, mouvement);
    return res.data.mouvement;
  } catch (err: any) {
    console.error('Erreur API Update :', err.response?.data || err);
    throw new Error('Erreur API lors de la modification');
  }
}

// DELETE supprimer
export async function deleteMouvement(token: string, id: string) {
  try {
    await api.delete(`/mouvements/${id}`);
    return true;
  } catch (err: any) {
    console.error('Erreur API Delete :', err.response?.data || err);
    throw new Error('Erreur API lors de la suppression');
  }
}

// ===============================
// LOGIN
// ===============================
export async function loginUser(userLogin: string, password: string) {
  try {
    const res = await api.post('/generatetoken', { userLogin, password });
    return res.data.token;
  } catch {
    return null;
  }
}

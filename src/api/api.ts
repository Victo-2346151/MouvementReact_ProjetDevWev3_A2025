import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
console.log('API_URL =', import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: API_URL,
});

// ===============================
// INTERCEPTOR JWT
// ===============================
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
export async function getMouvements() {
  const res = await api.get('/mouvements');
  return res.data.data;
}

// GET par ID
export async function getMouvementById(id: string) {
  const res = await api.get(`/mouvements/${id}`);
  return res.data.data;
}

// POST ajouter
export async function addMouvement(mouvement: any) {
  try {
    const res = await api.post('/mouvements', mouvement);
    return res.data.data;
  } catch (err: any) {
    console.error('Erreur API Add :', err.response?.data || err);
    throw new Error('Erreur API lors de la création du mouvement');
  }
}

// PUT modifier
export async function updateMouvement(id: string, mouvement: any) {
  try {
    const res = await api.put(`/mouvements/${id}`, mouvement);
    return res.data.data;
  } catch (err: any) {
    console.error('Erreur API Update :', err.response?.data || err);
    throw new Error('Erreur API lors de la modification');
  }
}

// DELETE supprimer
export async function deleteMouvement(id: string) {
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
export async function loginUser(email: string, password: string) {
  const res = await api.post('/generatetoken', {
    userLogin: {
      email,
      password,
    },
  });

  return res.data.token;
}

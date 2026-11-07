/**
 * Service API avec Axios
 * Configuration et méthodes pour communiquer avec le backend PHP
 */

import axios from 'axios';

// URL de base de l'API PHP
// Modifier selon votre configuration XAMPP
const API_BASE_URL = 'http://localhost/Travel-Agency/api';

// Créer une instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTHENTIFICATION ====================

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - { nom, prenom, email, password }
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register.php', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur de connexion' };
  }
};

/**
 * Connexion d'un utilisateur
 * @param {Object} credentials - { email, password }
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/login.php', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur de connexion' };
  }
};

/**
 * Déconnexion de l'utilisateur
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Récupérer l'utilisateur connecté
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Vérifier si l'utilisateur est connecté
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// ==================== VOYAGES ====================

/**
 * Récupérer tous les voyages
 * @param {Object} params - { type, search }
 */
export const getVoyages = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append('type', params.type);
    if (params.search) queryParams.append('search', params.search);
    
    const url = `/voyages.php${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de la récupération des voyages' };
  }
};

/**
 * Récupérer un voyage par ID
 * @param {number} id
 */
export const getVoyageById = async (id) => {
  try {
    const response = await api.get(`/voyages.php?id=${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de la récupération du voyage' };
  }
};

/**
 * Créer un nouveau voyage (admin)
 * @param {Object} voyageData
 */
export const createVoyage = async (voyageData) => {
  try {
    const response = await api.post('/voyages.php', voyageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de la création du voyage' };
  }
};

// ==================== RÉSERVATIONS ====================

/**
 * Récupérer les réservations de l'utilisateur
 * @param {number} userId
 * @param {string} type - 'local' ou 'international'
 */
export const getReservations = async (userId, type = null) => {
  try {
    let url = `/reservations.php?user_id=${userId}`;
    if (type) url += `&type=${type}`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de la récupération des réservations' };
  }
};

/**
 * Créer une réservation
 * @param {Object} reservationData - { user_id, voyage_id, nb_personnes }
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations.php', reservationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de la création de la réservation' };
  }
};

/**
 * Annuler une réservation
 * @param {number} reservationId
 * @param {number} userId
 */
export const cancelReservation = async (reservationId, userId) => {
  try {
    const response = await api.delete(`/reservations.php?id=${reservationId}&user_id=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erreur lors de l\'annulation' };
  }
};

export default api;

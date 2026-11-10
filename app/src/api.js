/**
 * Service API - MODE DÉMO STATIQUE (GitHub Pages)
 *
 * GitHub Pages ne peut pas exécuter PHP/MySQL, donc :
 *  - les voyages viennent de src/data/voyages.js (extrait de voyage_algerie.sql)
 *  - les comptes et réservations sont stockés dans le localStorage du navigateur
 *
 * Les fonctions gardent les mêmes noms et formats de réponse que l'API PHP,
 * donc aucune page n'a besoin d'être modifiée.
 * L'ancienne version PHP est conservée dans api.php.backup.js.
 */

import { VOYAGES } from '../data/voyages';

const KEYS = {
  users: 'va_users',
  reservations: 'va_reservations',
  token: 'token',
  user: 'user',
};

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage indisponible (navigation privée...) */
  }
};

// Petit délai pour imiter un appel réseau
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

// Hash simple (démo uniquement, ce n'est PAS sécurisé)
const hash = (str) => btoa(unescape(encodeURIComponent(str)));
const makeToken = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');

// ==================== AUTHENTIFICATION ====================

export const register = async ({ nom, prenom, email, password }) => {
  await wait();
  if (!nom || !prenom || !email || !password) throw { error: 'Tous les champs sont requis' };
  if (password.length < 6) throw { error: 'Le mot de passe doit contenir au moins 6 caractères' };

  const users = read(KEYS.users, []);
  if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    throw { error: 'Cet email est déjà utilisé' };
  }

  const user = {
    id: Date.now(),
    nom: nom.trim(),
    prenom: prenom.trim(),
    email: email.trim(),
  };
  users.push({ ...user, password: hash(password) });
  write(KEYS.users, users);

  const token = makeToken();
  localStorage.setItem(KEYS.token, token);
  write(KEYS.user, user);
  return { success: true, message: 'Inscription réussie', user, token };
};

export const login = async ({ email, password }) => {
  await wait();
  const users = read(KEYS.users, []);
  const found = users.find(
    (u) => u.email.toLowerCase() === (email || '').trim().toLowerCase() && u.password === hash(password || '')
  );
  if (!found) throw { error: 'Email ou mot de passe incorrect' };

  const { password: _pw, ...user } = found;
  const token = makeToken();
  localStorage.setItem(KEYS.token, token);
  write(KEYS.user, user);
  return { success: true, message: 'Connexion réussie', user, token };
};

export const logout = () => {
  localStorage.removeItem(KEYS.token);
  localStorage.removeItem(KEYS.user);
};

export const getCurrentUser = () => read(KEYS.user, null);

export const isAuthenticated = () => !!localStorage.getItem(KEYS.token);

// ==================== VOYAGES ====================

const normalize = (s) =>
  (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const getVoyages = async (params = {}) => {
  await wait(150);
  let voyages = [...VOYAGES];

  if (params.type === 'local' || params.type === 'international') {
    voyages = voyages.filter((v) => v.type === params.type);
  }
  if (params.search && params.search.trim()) {
    const q = normalize(params.search.trim());
    voyages = voyages.filter((v) =>
      [v.destination, v.wilaya, v.description].some((field) => normalize(field).includes(q))
    );
  }

  return {
    success: true,
    count: voyages.length,
    voyages,
    voyages_locaux: voyages.filter((v) => v.type === 'local'),
    voyages_internationaux: voyages.filter((v) => v.type === 'international'),
  };
};

export const getVoyageById = async (id) => {
  await wait(100);
  const voyage = VOYAGES.find((v) => v.id === Number(id));
  if (!voyage) throw { error: 'Voyage non trouvé' };
  return { success: true, voyage };
};

// Création de voyage : non disponible en mode démo
export const createVoyage = async () => {
  throw { error: 'Création de voyage indisponible en mode démo' };
};

// ==================== RÉSERVATIONS ====================

export const getReservations = async (userId, type = null) => {
  await wait(150);
  const all = read(KEYS.reservations, []).filter((r) => r.user_id === Number(userId));

  let reservations = all
    .map((r) => {
      const v = VOYAGES.find((x) => x.id === r.voyage_id);
      if (!v) return null;
      return {
        ...r,
        voyage_type: v.type,
        destination: v.destination,
        wilaya: v.wilaya,
        prix: v.prix,
        date_depart: v.date_depart,
        date_retour: v.date_retour,
        description: v.description,
        image: v.image,
        prix_total: v.prix * r.nb_personnes,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date_reservation) - new Date(a.date_reservation));

  if (type === 'local' || type === 'international') {
    reservations = reservations.filter((r) => r.voyage_type === type);
  }

  return {
    success: true,
    count: reservations.length,
    reservations,
    reservations_locaux: reservations.filter((r) => r.voyage_type === 'local'),
    reservations_internationaux: reservations.filter((r) => r.voyage_type === 'international'),
  };
};

export const createReservation = async ({ user_id, voyage_id, nb_personnes = 1 }) => {
  await wait();
  const userId = Number(user_id);
  const voyageId = Number(voyage_id);
  const nb = Number(nb_personnes) || 1;

  if (nb < 1) throw { error: 'Le nombre de personnes doit être au moins 1' };

  const voyage = VOYAGES.find((v) => v.id === voyageId);
  if (!voyage) throw { error: 'Voyage non trouvé' };

  const reservations = read(KEYS.reservations, []);
  if (reservations.some((r) => r.user_id === userId && r.voyage_id === voyageId)) {
    throw { error: 'Vous avez déjà réservé ce voyage' };
  }

  const reservation = {
    id: Date.now(),
    user_id: userId,
    voyage_id: voyageId,
    nb_personnes: nb,
    date_reservation: new Date().toISOString(),
  };
  reservations.push(reservation);
  write(KEYS.reservations, reservations);

  return {
    success: true,
    message: 'Réservation créée avec succès',
    reservation_id: reservation.id,
    prix_total: voyage.prix * nb,
  };
};

export const cancelReservation = async (reservationId, userId) => {
  await wait();
  const reservations = read(KEYS.reservations, []);
  const exists = reservations.some((r) => r.id === Number(reservationId) && r.user_id === Number(userId));
  if (!exists) throw { error: 'Réservation non trouvée ou non autorisée' };

  write(
    KEYS.reservations,
    reservations.filter((r) => r.id !== Number(reservationId))
  );
  return { success: true, message: 'Réservation annulée avec succès' };
};

export default {};

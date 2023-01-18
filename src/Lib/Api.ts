import {
  RegistrationAndLoginState,
  User,
} from '../Type/RegistrationAndLogin.Type'

/**
 * @module Api
 *
 * @description
 *  Ce module contient toutes les requếtes de l'api
 */

/**
 * Créé un nouveau compte
 */
export async function createAccount(state: RegistrationAndLoginState) {
  // Envoie de la requête http
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: state.email,
      password: state.password,
      repeatedPassword: state.repeatedPassword,
      firstname: state.firstname,
      lastname: state.lastname,
    }),
  })

  // On s'assure que le status code ne soit pas en erreur
  if (response.status > 299) {
    // @TODO personnaliser les erreurs :)
    throw new Error('')
  }

  // On récupérer les données
  const data = await response.json()

  // On retourne les données convertie en utilisateur
  return data as User
}

/**
 * Créé un jeton de connexion sur l'api
 */
export async function createToken(email: string, password: string) {
  // Envoie de la requête http
  const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  // On s'assure que le status ode ne soit pas en erreur
  if (response.status > 299) {
    // @TODO personnaliser les erreurs ici ;)
    throw new Error('')
  }

  // On récupére le token
  const { token } = await response.json()

  // on retourne le token en tant que string
  return token as string
}

/**
 * Retourne l'utilisateur actuellement connécté
 */
export async function getMe(token: string) {
  // Envoie de la requête http
  const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  // On vérifie sur le status code ne soit pas en erreur
  if (response.status > 299) {
    // @TODO personnaliser les erreurs ici :)
    throw new Error('')
  }

  // On récupére l'utilisateur
  const me = await response.json()

  // on le retourne
  return me as User
}

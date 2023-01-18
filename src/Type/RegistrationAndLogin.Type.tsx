/**
 * @module RegistrationAndLogin.Type
 *
 * @description
 *  Ce module contient les types pour la page d'inscription
 *  et de connexion
 */

/**
 * Représente un utilisateur connécté ou non
 */
export type User = {
  _id: string
  email: string
  firstname: string
  lastname: string
}

/**
 * Réprésente l'état de la page de connexion et d'inscription
 * à l'application
 */
export type RegistrationAndLoginState = {
  email: string
  password: string
  repeatedPassword: string
  firstname: string
  lastname: string
  error: string
  loading: boolean
  user?: User
}

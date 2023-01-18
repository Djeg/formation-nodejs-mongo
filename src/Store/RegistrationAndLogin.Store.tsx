import { action, map } from 'nanostores'
import { createAccount, createToken, getMe } from '../Lib/Api'
import {
  RegistrationAndLoginState,
  User,
} from '../Type/RegistrationAndLogin.Type'

/**
 * @module RegistrationAndLogin.Store
 *
 * @description
 *  Ce module contient le Store pour la page d'inscription
 *  et de connexion à la l'application shoes.me
 */

/**
 * Store contenant les états nescessaire pour l'inscription et
 * la connexion
 */
export const RegistrationAndLoginStore = map<RegistrationAndLoginState>({
  email: '',
  password: '',
  repeatedPassword: '',
  firstname: '',
  lastname: '',
  error: '',
  loading: false,
})

/**
 * Change l'email contenu dans le store
 */
export const setEmail = action(
  RegistrationAndLoginStore,
  'setEmail',
  (store, newEmail: string) => {
    store.setKey('email', newEmail)
  },
)

/**
 * Change le password contenu dans le store
 */
export const setPassword = action(
  RegistrationAndLoginStore,
  'setPassword',
  (store, newPassword: string) => {
    store.setKey('password', newPassword)
  },
)

/**
 * Change le repeatedPassword contenue dans le store
 */
export const setRepeatedPassword = action(
  RegistrationAndLoginStore,
  'setRepeatedPassword',
  (store, newPassword: string) => {
    store.setKey('repeatedPassword', newPassword)
  },
)

/**
 * Change le firstname contenue dans le store
 */
export const setFirstname = action(
  RegistrationAndLoginStore,
  'setFirstname',
  (store, newFirstname: string) => {
    store.setKey('firstname', newFirstname)
  },
)

/**
 * Change le lastname contenue dans le store
 */
export const setLastname = action(
  RegistrationAndLoginStore,
  'setLastname',
  (store, newLastname: string) => {
    store.setKey('lastname', newLastname)
  },
)

/**
 * Change l'erreur contenue dans le store
 */
export const setError = action(
  RegistrationAndLoginStore,
  'setError',
  (store, newError: string) => {
    store.setKey('error', newError)
  },
)

/**
 * Change le user contenue dans le store
 */
export const setUser = action(
  RegistrationAndLoginStore,
  'setUser',
  (store, user?: User) => {
    store.setKey('user', user)
  },
)

/**
 * Créé un compte en utilisant l'api
 */
export const createApiAccount = action(
  RegistrationAndLoginStore,
  'createApiAccount',
  async store => {
    // On commence par affiche « envoie en cours » ...
    store.setKey('loading', true)

    // On récupére l'état
    const state = store.get()

    try {
      // On créé l'utilisateur
      const user = await createAccount(state)
      // on créé le token
      const token = await createToken(state.email, state.password)

      // On enregistre le token dans le « localStorage »
      localStorage.setItem('token', token)

      // On met l'utilisateur dans l'état
      setUser(user)

      // on arréte le chargement de la page
      store.setKey('loading', false)
    } catch (e) {
      // Si il y a une erreur alors on arréte le chargement
      store.setKey('loading', false)
      // on affiche l'erreur
      setError('Oops !')
    }
  },
)

/**
 * Créé un jeton de connexion pour l'api
 */
export const createApiToken = action(
  RegistrationAndLoginStore,
  'createApiToken',
  async store => {
    // On commence par affiche « envoie en cours » ...
    store.setKey('loading', true)

    // On récupére l'état
    const state = store.get()

    try {
      // on créé le token
      const token = await createToken(state.email, state.password)

      // On récupére l'utitlisateur
      const user = await getMe(token)

      // On enregistre le token dans le « localStorage »
      localStorage.setItem('token', token)

      // On met l'utilisateur dans l'état
      setUser(user)

      // on arréte le chargement de la page
      store.setKey('loading', false)
    } catch (e) {
      // Si il y a une erreur alors on arréte le chargement
      store.setKey('loading', false)
      // on affiche l'erreur
      setError('Oops !')
    }
  },
)

/**
 * Action permettant de s'auto connécter avec le token présent
 * dans le local storage
 */
export const autoConnect = action(
  RegistrationAndLoginStore,
  'autoConnect',
  async store => {
    // on affiche le chargement
    store.setKey('loading', true)

    // On récupére le token
    const token = localStorage.getItem('token')

    // On test si le token est bien enrgistré dans le local storage
    if (!token) {
      // On désactive le chargement
      store.setKey('loading', false)

      // on arréte la fonction
      return
    }

    try {
      // On récupére l'utilistateur
      const user = await getMe(token)

      // On le met dans l'état
      store.setKey('user', user)
    } finally {
      store.setKey('loading', false)
    }
  },
)

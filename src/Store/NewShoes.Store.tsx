import { action, map } from 'nanostores'
import { NavigateFunction } from 'react-router-dom'

/**
 * @module NewShoes.Store
 *
 * @description
 *  Contient l'état du composant de création d'une nouvelle
 *  chaussure.
 */

/**
 * Store contenant l'état de mon écran de nouvelle chaussure
 */
export const NewShoesStore = map({
  title: '',
  brand: '',
  model: '',
  price: 0,
  color: '',
  condition: '',
  size: 0,
  picture: '',
  loading: false,
})

/**
 * Action permettant de modifier le titre de l'état
 */
export const setTitle = action(
  NewShoesStore,
  'setTitle',
  (store, newTitle: string) => {
    // Je modifie le « title » de mon store
    store.setKey('title', newTitle)
  },
)

/**
 * Action permettant de modifier le « brand » de l'état
 */
export const setBrand = action(
  NewShoesStore,
  'setBrand',
  (store, newBrand: string) => {
    // Met à jour l'état « brand » de notre store
    store.setKey('brand', newBrand)
  },
)

/**
 * Action permettant de modifier le « model » de l'état
 */
export const setModel = action(
  NewShoesStore,
  'setModel',
  (store, newModel: string) => {
    // Met à jour l'état « model » de notr store
    store.setKey('model', newModel)
  },
)

/**
 * Action permettant de modifier le « price » de l'état
 */
export const setPrice = action(
  NewShoesStore,
  'setPrice',
  (store, newPrice: number) => {
    // Met à jour l'état « price » de notre store
    store.setKey('price', newPrice)
  },
)

/**
 * Action permettant de modifier le « color » de l'état
 */
export const setColor = action(
  NewShoesStore,
  'setColor',
  (store, newColor: string) => {
    // Met à jour la « color » contenue dans le store
    store.setKey('color', newColor)
  },
)

/**
 * Action permettant de modifier le « condition » de l'état
 */
export const setCondition = action(
  NewShoesStore,
  'setCondition',
  (store, newCondition: string) => {
    // Met à jour la « condition » de notre store
    store.setKey('condition', newCondition)
  },
)

/**
 * Action permettant de modifier la « size » de l'état
 */
export const setSize = action(
  NewShoesStore,
  'setSize',
  (store, newSize: number) => {
    // Met à jour la « size » de notre store
    store.setKey('size', newSize)
  },
)

/**
 * Action permettant de modifier la « picture » de l'état
 */
export const setPicture = action(
  NewShoesStore,
  'setPicture',
  (store, newPicture: string) => {
    // Met à jour la « picture » de notre store
    store.setKey('picture', newPicture)
  },
)

/**
 * Action permettant d'envoyer la chaussure sur l'api
 */
export const createApiNewShoes = action(
  NewShoesStore,
  'createApiNewShoes',
  async (store, navigate: NavigateFunction) => {
    // Je met le bouton en mode chargement
    store.setKey('loading', true)

    // Je vais récupérer le jeton de connexion de l'utilisateur
    const token = localStorage.getItem('token')

    // Je récupére le contenu de mon état
    const { title, brand, model, color, picture, condition, size, price } =
      store.get()

    // Je lance la requête HTTP permettant de créer une nouvelle chaussure
    const response = await fetch('http://localhost:5353/shoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        brand,
        model,
        color: color.slice(1),
        condition,
        price,
        size,
        pictures: [picture],
      }),
    })

    // Je récupére le json que l'api vient de me retourner !
    const shoes = await response.json()

    // On arréte le chargement
    store.setKey('loading', false)

    // On redirige sur la page d'accueil
    navigate('/')
  },
)

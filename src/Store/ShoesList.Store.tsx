import { action, map } from 'nanostores'
import { ShoesListState } from '../Type/ShoesList.Type'

/**
 * @module
 *
 * @description
 *  Module contenant le store de l'écran de liste des chaussures
 */

/**
 * Contient le store de la liste des chaussures
 */
export const ShoesListStore = map<ShoesListState>({
  shoes: [],
})

/**
 * Action permettant d'aller chercher les chaussures sur l'api
 */
export const fetchApiShoes = action(
  ShoesListStore,
  'fetchApiShoes',
  async store => {
    // Je récupére le jeton de conexion de l'utilisateur stocké dans le « localStorage »
    const token = localStorage.getItem('token')

    // Je lance ma requête http pour récupérer les chaussures
    const response = await fetch('http://localhost:5353/shoes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    // Je récupére la collection de chaussure
    const shoes = await response.json()

    // Je met les chaussure dans mon store
    store.setKey('shoes', shoes || [])
  },
)

import { map } from 'nanostores'
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

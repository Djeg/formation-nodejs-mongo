import { User } from './RegistrationAndLogin.Type'

/**
 * @module ShoesList.Type
 *
 * @description
 *  Contient les types du composant d'affichage de
 *  la liste des chaussures
 */

/**
 * Représente une chaussure à vendre
 */
export type Shoes = {
  _id: string
  title: string
  brand: string
  model: string
  pictures: string[]
  price: number
  user: User
}

/**
 * Contient l'état du composant de liste de chaussure
 */
export type ShoesListState = {
  shoes: Shoes[]
}

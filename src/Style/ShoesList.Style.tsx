import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Theme } from './Global.Style'
import { Title } from './RegistrationAndLogin.Style'

/**
 * @module ShoesList.Style
 *
 * @description
 *  Ce module contient les différents composants stylisé
 *  de l'écran de liste des chaussures
 */

/**
 * The application title
 */
export const AppTitle = styled(Title)`
  color: ${Theme.colors.gray};
`

/**
 * Container affichant les élément de haut en base
 */
export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 70px;
`

/**
 * Container pour la barre de navigation du bas
 */
export const BottomNavContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${Theme.sizes.s};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${Theme.colors.grey};
  backdrop-filter: blur(6px);
  background-color: transparent;
  justify-content: space-between;
`

/**
 * Contient les liens du bottom nav
 */
export const BottomNavLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${Theme.colors.grey};
  align-items: center;
  justify-content: center;
`

/**
 * Contient le bouton de menu
 */
export const BottomNavIcon = styled.i`
  display: flex;
  padding: ${Theme.sizes.xxs};
  font-size: ${Theme.sizes.l};
  color: ${Theme.colors.gray};
  text-align: center;
  cursor: pointer;
`

/**
 * Grille contenant les chaussures
 */
export const ShoesGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Theme.sizes.xxs} ${Theme.sizes.xxs};
  margin: 0px ${Theme.sizes.xs};
`

/**
 * Contient la carte d'un annonce de chaussure
 */
export const ShoesCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(4px);
  border: 1px solid ${Theme.colors.grey};
  justify-self: stretch;
`

/**
 * Contient le titre d'un annonce de chaussure
 */
export const ShoesCardBrand = styled.p`
  padding: 0;
  margin: 0;
  font-weight: bold;
  font-size: ${Theme.sizes.m};
  color: ${Theme.colors.white};
`

/**
 * Contient le nom et la marque de la chaussure
 */
export const ShoesName = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  width: 100%;
  padding: ${Theme.sizes.xs};
`

/**
 * Contient le dégradé sur image
 */
export const BackLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(28, 23, 33, 1) 0%,
    rgba(0, 0, 0, 0) 48%
  );
`

/**
 * Contient le titre d'un annonce de chaussure
 */
export const ShoesCardModel = styled.p`
  font-size: ${Theme.sizes.s};
  color: ${Theme.colors.white};
  padding: 0;
  margin: 0;
  font-weight: 500;
`

/**
 * Contient le block de présentation
 */
export const ShoesCardDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

/**
 * Contient le block de l'image de la chaussure
 */
export const ShoesCardImageContainer = styled.div`
  object-fit: cover;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

/**
 * Contient l'image de la chaussure
 */
export const ShoesCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
`

/**
 * Contient les info sur la chaussure
 */
export const ShoesCardInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-basis: 40%;
  padding: ${Theme.sizes.xxs};
`

/**
 * Contient le text du prix
 */
export const PriceText = styled.p`
  font-size: ${Theme.sizes.m};
  font-weight: bold;
  margin: 0;
`

/**
 * Contient le nom d'utilisateur
 */
export const UserText = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${Theme.sizes.s};
  margin-bottom: ${Theme.sizes.xs};
`

/**
 * Voir plus bouton
 */
export const SeeMoreButton = styled(Link)`
  display: flex;
  text-decoration: none;
  border: 0;
  outline: none;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Theme.sizes.s} ${Theme.sizes.l};
  background-color: ${Theme.colors.grey};
  font-size: ${Theme.sizes.n};
  cursor: pointer;
`

/**
 * Search utto
 */
export const SearchButton = styled(SeeMoreButton)``

/*
 * Contient l'en -tête de la page
 */
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-bottom: 1px solid ${Theme.colors.grey};
  backdrop-filter: blur(4px);
  margin-bottom: ${Theme.sizes.xs};
  align-items: stretch;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
`

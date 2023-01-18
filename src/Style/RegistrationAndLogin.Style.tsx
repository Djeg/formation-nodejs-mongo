import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Theme } from './Global.Style'

/**
 * @module RegistrationAndLogin.Style
 *
 * @description
 *  Ce module contient le style pour les composants d'inscription
 *  et de connexion à l'application
 */

/**
 * Container affichant tout de manière centré
 */
export const CenteredMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
`

/**
 * Titre de la page d'inscription et de connexion
 */
export const Title = styled.h1`
  margin: ${Theme.sizes.xs};
  padding: ${Theme.sizes.xxs};
  font-family: ${Theme.fonts.display};
  text-align: center;
  font-size: ${Theme.sizes.xl};
  color: ${Theme.colors.black};
`

/**
 * Contient un input pour le formulaire de connexion
 */
export const Input = styled.input`
  display: flex;
  padding: ${Theme.sizes.n};
  border: 1px solid ${Theme.colors.grey};
  background-color: transparent;
  color: ${Theme.colors.black};
  margin: 0px ${Theme.sizes.n} ${Theme.sizes.n} ${Theme.sizes.n};
  outline: none;
  backdrop-filter: blur(4px);
  font-family: ${Theme.fonts.normal};
  font-size: ${Theme.sizes.s};

  &:focus {
    outline: none;
  }
`

/**
 * Container pour le bouton d'envoi
 */
export const HorizontalCenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

/**
 * Bouton d'envoie
 */
export const SendButton = styled.button`
  border: 0;
  outline: none;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Theme.sizes.s} ${Theme.sizes.l};
  background-color: ${Theme.colors.green};
  font-size: ${Theme.sizes.n};
  cursor: pointer;
`

/**
 * Contient le text permettant de passer de la page de connexion
 * à la page d'inscription
 */
export const Text = styled.p`
  text-align: center;
`

/**
 * Contient le text D'erreir du formulaire
 */
export const ErrorText = styled.p`
  text-align: center;
  color: ${Theme.colors.red};
  font-weight: bold;
`

/**
 * Contient le lien vers la page de connexion
 */
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${Theme.colors.deepBlue};
  font-weight: bold;
`

import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  autoConnect,
  createApiAccount,
  RegistrationAndLoginStore,
  setEmail,
  setFirstname,
  setLastname,
  setPassword,
  setRepeatedPassword,
} from '../Store/RegistrationAndLogin.Store'
import {
  HorizontalCenteredContainer,
  CenteredMainContainer,
  Input,
  SendButton,
  Title,
  Text,
  ErrorText,
} from '../Style/RegistrationAndLogin.Style'

/**
 * @module Registration
 *
 * @description
 *  Module contenant le composant d'inscription à l'application
 */

/**
 * Affiche l'écran d'inscription
 */
export default function Registration() {
  // Récupération de l'état du composant
  const {
    user,
    email,
    password,
    repeatedPassword,
    firstname,
    lastname,
    loading,
    error,
  } = useStore(RegistrationAndLoginStore)

  // Création d'un effet permettant de s'auto connécter
  useEffect(() => {
    autoConnect()
  }, [])

  // Si un utilisateur est dèja connécté
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <CenteredMainContainer>
      <Title>Inscription</Title>
      <Input
        type="email"
        placeholder="Email ..."
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <Input
        type="password"
        placeholder="Mot de passe ..."
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
      />
      <Input
        type="password"
        placeholder="Répéter votre mot de passe ..."
        value={repeatedPassword}
        onChange={e => setRepeatedPassword(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Nom ..."
        value={lastname}
        onChange={e => setLastname(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Prenom ..."
        value={firstname}
        onChange={e => setFirstname(e.currentTarget.value)}
      />
      {error ? (
        <HorizontalCenteredContainer>
          <ErrorText>{error}</ErrorText>
        </HorizontalCenteredContainer>
      ) : null}
      <HorizontalCenteredContainer>
        {loading ? (
          <p>Envoie en cours ...</p>
        ) : (
          <SendButton onClick={createApiAccount}>Envoyer</SendButton>
        )}
      </HorizontalCenteredContainer>
      <HorizontalCenteredContainer>
        <Text>
          Vous avez déja un compte ?
          <br />
          <Link to="/">Connéctez-vous</Link>
        </Text>
      </HorizontalCenteredContainer>
    </CenteredMainContainer>
  )
}

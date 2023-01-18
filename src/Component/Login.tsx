import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {
  autoConnect,
  createApiToken,
  RegistrationAndLoginStore,
  setEmail,
  setPassword,
} from '../Store/RegistrationAndLogin.Store'
import {
  CenteredMainContainer,
  ErrorText,
  HorizontalCenteredContainer,
  Input,
  SendButton,
  Text,
  Title,
} from '../Style/RegistrationAndLogin.Style'

/**
 * @module Login
 *
 * @description
 *  Ce module contient le composant de connexion à l'application
 */

/**
 * Affiche l'écran de connexion
 */
export default function Login() {
  // Récupération de l'état du composant
  const { user, email, password, error, loading } = useStore(
    RegistrationAndLoginStore,
  )

  // Création d'un effet permettant de s'auto connécter
  useEffect(() => {
    autoConnect()
  }, [])

  // on test si un utilisateur est connécté
  if (user) {
    return <Outlet />
  }

  return (
    <CenteredMainContainer>
      <Title>Connexion</Title>
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
      {error ? (
        <HorizontalCenteredContainer>
          <ErrorText>{error}</ErrorText>
        </HorizontalCenteredContainer>
      ) : null}
      <HorizontalCenteredContainer>
        {loading ? (
          <p>Envoie en cours ...</p>
        ) : (
          <SendButton onClick={createApiToken}>Envoyer</SendButton>
        )}
      </HorizontalCenteredContainer>
      <HorizontalCenteredContainer>
        <Text>
          Vous n'avez pas de compte ?
          <br />
          <Link to="/inscription">Inscrivez-vous</Link>
        </Text>
      </HorizontalCenteredContainer>
    </CenteredMainContainer>
  )
}

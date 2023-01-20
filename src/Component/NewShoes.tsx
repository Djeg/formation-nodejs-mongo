import { useStore } from '@nanostores/react'
import { useNavigate } from 'react-router-dom'
import {
  createApiNewShoes,
  NewShoesStore,
  setBrand,
  setColor,
  setCondition,
  setModel,
  setPicture,
  setPrice,
  setSize,
  setTitle,
} from '../Store/NewShoes.Store'
import {
  HorizontalCenteredContainer,
  Input,
  SendButton,
} from '../Style/RegistrationAndLogin.Style'
import { VerticalContainer } from '../Style/ShoesList.Style'
import {
  Header,
  AppTitle,
  BottomNavContainer,
  BottomNavLink,
  BottomNavIcon,
} from '../Style/ShoesList.Style'

/**
 * @module NewShoes
 *
 * @description
 *  Contient le composant d'affichage de l'écran de nouvelle chaussure
 */

/**
 * Composant d'affichage de l'écran de nouvelle chaussure
 */
export default function NewShoes() {
  const navigate = useNavigate()
  const {
    title,
    brand,
    model,
    price,
    color,
    condition,
    size,
    picture,
    loading,
  } = useStore(NewShoesStore)

  return (
    <VerticalContainer>
      <Header>
        <AppTitle>Nouvelle Chaussure</AppTitle>
      </Header>
      <Input
        type="text"
        placeholder="Titre de l'annonce ..."
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Marque de la chaussure ..."
        value={brand}
        onChange={e => setBrand(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Modèle de la chaussure ..."
        value={model}
        onChange={e => setModel(e.currentTarget.value)}
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Prix ..."
        value={price}
        onChange={e => setPrice(parseInt(e.currentTarget.value))}
      />
      <Input
        type="color"
        placeholder="Couleur ..."
        value={color}
        onChange={e => setColor(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="État de la chaussure ..."
        value={condition}
        onChange={e => setCondition(e.currentTarget.value)}
      />
      <Input
        type="number"
        placeholder="Pointure ..."
        min={15}
        max={70}
        value={size}
        onChange={e => setSize(parseInt(e.currentTarget.value))}
      />
      <Input
        type="url"
        placeholder="Image ..."
        value={picture}
        onChange={e => setPicture(e.currentTarget.value)}
      />
      <HorizontalCenteredContainer>
        {loading ? (
          <p>Envoie en cours ...</p>
        ) : (
          <SendButton onClick={() => createApiNewShoes(navigate)}>
            Créer l'annonce
          </SendButton>
        )}
      </HorizontalCenteredContainer>
      <BottomNavContainer>
        <BottomNavLink to="/">
          <BottomNavIcon className="fa-solid fa-circle-arrow-left"></BottomNavIcon>
        </BottomNavLink>
      </BottomNavContainer>
    </VerticalContainer>
  )
}

import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import { fetchApiShoes, ShoesListStore } from '../Store/ShoesList.Store'
import { SendButton, Text, Title } from '../Style/RegistrationAndLogin.Style'
import {
  BottomNavContainer,
  BottomNavIcon,
  PriceText,
  ShoesCardContainer,
  ShoesCardDescriptionContainer,
  ShoesCardImage,
  ShoesCardImageContainer,
  ShoesCardInformationContainer,
  ShoesCardBrand,
  ShoesGridContainer,
  VerticalContainer,
  ShoesCardModel,
  ShoesName,
  BackLayer,
  UserText,
  SeeMoreButton,
  SearchButton,
  Header,
  BottomNavLink,
  AppTitle,
} from '../Style/ShoesList.Style'

/**
 * @module ShoesList
 *
 * @description
 *  Ce module contient le composant d'affichage de la liste des chaussures
 */

/**
 * Composant d'affichage de l'écran de liste des chaussures
 */
export default function ShoesList() {
  // Récupération des données du store
  const { shoes } = useStore(ShoesListStore)

  // Ajout d'un effet qui le lance lors de l'affichage du composant
  useEffect(() => {
    fetchApiShoes()
  }, [])

  return (
    <VerticalContainer>
      <Header>
        <AppTitle>Shoes.me</AppTitle>
      </Header>
      <ShoesGridContainer>
        {/* On boucle sur toutes les chaussures du store */}
        {shoes.map(s => (
          <ShoesCardContainer key={s._id}>
            <ShoesCardDescriptionContainer>
              <ShoesCardImageContainer>
                <ShoesCardImage src={s.pictures[0]} alt={s.title} />
                <ShoesName>
                  <ShoesCardBrand>{s.brand}</ShoesCardBrand>
                  <ShoesCardModel>{s.model}</ShoesCardModel>
                </ShoesName>
                <BackLayer />
              </ShoesCardImageContainer>
            </ShoesCardDescriptionContainer>
            <ShoesCardInformationContainer>
              <PriceText>{s.price}&nbsp;€</PriceText>
              <UserText>
                Par {s.user.firstname}&nbsp;{s.user.lastname}
              </UserText>
              <SeeMoreButton to="">
                <i className="fa-solid fa-cart-arrow-down" />
              </SeeMoreButton>
            </ShoesCardInformationContainer>
          </ShoesCardContainer>
        ))}
      </ShoesGridContainer>
      <BottomNavContainer>
        <BottomNavLink to="">
          <BottomNavIcon className="fa-solid fa-magnifying-glass"></BottomNavIcon>
        </BottomNavLink>
        <BottomNavLink to="/nouvelle-chaussure">
          <BottomNavIcon className="fa-solid fa-circle-plus"></BottomNavIcon>
        </BottomNavLink>
        <BottomNavIcon className="fa-solid fa-right-from-bracket"></BottomNavIcon>
      </BottomNavContainer>
    </VerticalContainer>
  )
}

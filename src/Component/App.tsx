import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStyle } from '../Style/Global.Style'
import Login from './Login'
import NewShoes from './NewShoes'
import Registration from './Registration'
import ShoesList from './ShoesList'

/**
 * @module App
 *
 * @description
 *  Composant contenant l'intégralité de l'application react
 */

/**
 * Composant affichant l'intégralité de l'application
 */
export default function App() {
  return (
    <StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="" element={<ShoesList />} />
            <Route path="nouvelle-chaussure" element={<NewShoes />} />
          </Route>
          <Route path="/inscription" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}

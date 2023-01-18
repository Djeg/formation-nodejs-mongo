import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStyle } from '../Style/Global.Style'
import Login from './Login'
import Registration from './Registration'

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
            <Route path="" element={<h1>App</h1>} />
          </Route>
          <Route path="/inscription" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}

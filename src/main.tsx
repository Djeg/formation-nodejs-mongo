import ReactDOM from 'react-dom/client'
import App from './Component/App'

/**
 * @module main
 *
 * @description
 *  Ce module contient le code de « démarrage » de l'application
 *  react. Il affiche le composant <App /> dans la div avec l'identifiant
 *  #root
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App></App>,
)

import { createGlobalStyle } from 'styled-components'

/**
 * @module Global.Style
 *
 * @description
 *  Ce module contient le style global de l'application
 *  react.
 */

/**
 * Contient le theme de l'application
 */
export const Theme = {
  colors: {
    white: '#f0f0f0' as const,
    black: '#1c1721' as const,
    deepBlue: '#2d365a' as const,
    grey: '#d7d1d9' as const,
    gray: '#908594' as const,
    green: '#b4d3b8' as const,
    red: '#792020' as const,
  },
  fonts: {
    normal: `'Poppins', sans-serif` as const,
    display: `'Yeseva One', cursive` as const,
  },
  sizes: {
    xxs: '.4rem' as const,
    xs: '.6rem' as const,
    s: '.8rem' as const,
    n: '1rem' as const,
    m: '1.4rem' as const,
    l: '1.8rem' as const,
    xl: '2.2rem' as const,
    xxl: '3rem' as const,
  },
}

/**
 * Contient le style global de l'application
 */
export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    color: ${Theme.colors.black};
    background-color: ${Theme.colors.white};
    font-family: ${Theme.fonts.normal};
  }

  body, html, #root {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${Theme.colors.white};
    color: ${Theme.colors.black};
    font-family: ${Theme.fonts.normal};
  }

  #root {
    background-image: url('/logo3.png');
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${Theme.colors.deepBlue};
    font-weight: bold;
  }
`

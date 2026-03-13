import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    width: 100%;
    background: #f8fafc;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
    min-width: 320px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea {
    font: inherit;
  }
`;
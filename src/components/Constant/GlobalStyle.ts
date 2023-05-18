import { createGlobalStyle } from "styled-components";
import { font } from "./Fonts";

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }
      
  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-feature-settings: 'palt';
    color: inherit;
    font-size: ${font.fontSize.md}px;
    margin: 0;
    padding: 0;
    display: block;
    background: ${({ theme }) => theme.white};
    a {
      color: inherit;
      text-decoration: inherit;
    }
  }
`;

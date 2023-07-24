import { createGlobalStyle } from 'styled-components';
import JustAnotherHand from '../assets/fonts/JustAnotherHand-Regular.ttf';
import Yaldevi from '../assets/fonts/Yaldevi-VariableFont_wght.ttf';
import IndieFlower from '../assets/fonts/IndieFlower-Regular.ttf';
import OpenSans from '../assets/fonts/OpenSans-SemiBold.ttf';
import BMJUA from '../assets/fonts/BMJUA_ttf.ttf';
import jalnan from '../assets/fonts/Jalnan.ttf';
import { fadeOut } from './keyframes';
import { fadeIn } from './keyframes';
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Just Another Hand';
  font-style: normal;
  src: url(${JustAnotherHand}) format("truetype");
}
@font-face {
  // font-display: swap;
  font-family: 'Yaldevi';
  font-style: normal;
  font-weight: 400;
  src: url(${Yaldevi}) format('woff2'); 
}
@font-face {
  font-family: 'Indie Flower';
  src: url(${IndieFlower}) ;
}
@font-face {
  font-family: 'Open Sans';
  src: url(${OpenSans}) ;
}
@font-face {
    font-family: 'BMJUA';
    src: url(${BMJUA}) format('woff');
    font-weight: lighter;
    font-style: normal;
}
@font-face {
    font-family: 'jalnan';
    src: url(${jalnan}) format('woff');
    font-weight: normal;
    font-style: normal;
}
:root{
  --background: #FCFCFF;
  --light-purple: #DDDCED;
  --purple: #AAA8E0;
  --dark-purple: #555388;
  --white-gray: #777777;
  --bright-gray: #888888;
  --light-gray: #999999;
  --gray: #F5F5F5;
  --normal-gray: #E5E5E5;
  --dark-gray: #585858;
  --white: #FFFFFF;
  --bright-black: #4C4C4C;
  --light-black: #423D38;
  --black: #000000;
  --dark-blue-black: #142E38;
  --gold: #DCD2BD;
  --dark-gold: #877859;
  --dark-khaki: #665D49;
  --orange-yellow: #FAB65D;
  --ivory: #FFF4E4;
  --blue-purple: #7771D5;
  --light-blue-purple: #8784D6;
  --light-pink: #FFB7B0;
  --pink: #F178C5;
}
html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    text-decoration: none;
    color: var(--black);
    height: auto;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    overflow-x: hidden; 
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    width: 100vw;
    background-color: var(--background);
  }
  html {
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    background: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  input{
    outline: none;
    box-sizing: border-box;
  }
  .fadeIn {
    animation: 0.3s ${fadeIn} forwards;
  }
  .fadeOut {
    animation: 0.3s ${fadeOut} forwards;
  }
  .none {
    display: none;
  }
`;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root{
  //흰색흰색,회색,검은색,포인트색,노랑색 너비
  --white: #FFFFFF;
  --black: #000000;
  --orange-point: #F48225;
  --blue-text: #0074CC;
  --blue: #0A95FF;
  --blue-hover: #0064C2;
  --lightblue: #B3D3EA;
  --lightblue-hover: #B9D2E8;
  --gray-nav-active: #F1F2F3;
  --green: #2F6F44;
  --black-nav-active: #0C0D0E;
  --black-footer: #232629;
  --main-width: 1280px;
  --main-heigth: 80px;
  --main-padding: 76px;
  --gray-text: #6C737B;
//header height 80px / 패딩 값 0 76px
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
    font-family: 'Inter';
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;//?
    overflow-x: hidden; 
    -ms-user-select: none; //?
    -moz-user-select: -moz-none;//?
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    width: 100vw;
}
  ol, ul {
    list-style: none; //왜 적용안되는것임. ! 
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
  }
`;

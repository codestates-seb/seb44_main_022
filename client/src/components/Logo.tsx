import styled from 'styled-components';

function TextLogo() {
  return <LogoFont>BUYTE</LogoFont>;
}

const LogoFont = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 2rem;
  background-color: var(--background);
  color: var(--bright-black);
  font-size: 14px;
`;

export default TextLogo;

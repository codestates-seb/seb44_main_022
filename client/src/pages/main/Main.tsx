import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainSection1 from '../../components/Main/MainSection1';
import MainSection2 from '../../components/Main/MainSection2';
import MainSection3 from '../../components/Main/MainSection3';
import MainSidebar from '../../components/Main/MainSidebar';
import ModalPortal from '../../share/ModalPortal';
const MainRoot = styled.div`
  background-color: #fffffc;
  width: 100%;
  margin-top: 80px;
  text-align: left;
  font-size: 22px;
  min-height: calc(120vh - 80px - HeaderHeight - FooterHeight);
  position: relative;
`;

function Main() {
  const [activeSection, setActiveSection] = useState(1);

  const handleScrollToSection = (section: number) => {
    setActiveSection(section);

    const targetElement = document.getElementById(`section${section}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainRoot>
      <ModalPortal>
        <MainSidebar activeSection={activeSection} handleScrollToSection={handleScrollToSection} />
      </ModalPortal>
      <MainSection1 id="section1" />
      <MainSection2 id="section2" />
      <MainSection3 id="section3" />
    </MainRoot>
  );
}

export default Main;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainSection1 from '../../components/Main/MainSection1';
import MainSection2 from '../../components/Main/MainSection2';
import MainSection3 from '../../components/Main/MainSection3';
import MainSection4 from '../../components/Main/MainSection4';
import MainSection5 from '../../components/Main/MainSection5';
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const section1 = document.getElementById('section1');
      const section2 = document.getElementById('section2');
      const section3 = document.getElementById('section3');
      const section4 = document.getElementById('section4');
      const section5 = document.getElementById('section5');

      if (
        section1 &&
        section2 &&
        section3 &&
        section4 &&
        section5 &&
        scrollPosition < section2.offsetTop
      ) {
        setActiveSection(1);
      } else if (
        section2 &&
        section3 &&
        section4 &&
        section5 &&
        scrollPosition >= section2.offsetTop &&
        scrollPosition < section3.offsetTop
      ) {
        setActiveSection(2);
      } else if (
        section3 &&
        section4 &&
        section5 &&
        scrollPosition >= section3.offsetTop &&
        scrollPosition < section4.offsetTop
      ) {
        setActiveSection(3);
      } else if (
        section4 &&
        section5 &&
        scrollPosition >= section4.offsetTop &&
        scrollPosition < section5.offsetTop
      ) {
        setActiveSection(4);
      } else if (section5 && scrollPosition >= section5.offsetTop) {
        setActiveSection(5);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainRoot>
      <ModalPortal>
        <MainSidebar activeSection={activeSection} handleScrollToSection={handleScrollToSection} />
      </ModalPortal>
      <MainSection1 id="section1" />
      <MainSection2 id="section2" />
      <MainSection3 id="section3" />
      <MainSection4 id="section4" />
      <MainSection5 id="section5" />
    </MainRoot>
  );
}

export default Main;

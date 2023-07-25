import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainSection1 from '../../components/Main/MainSection1';
import MainSection2 from '../../components/Main/MainSection2';
import MainSection3 from '../../components/Main/MainSection3';
import MainSection4 from '../../components/Main/MainSection4';
import MainSection5 from '../../components/Main/MainSection5';
import MainSidebar from '../../components/Main/MainSidebar';
import ModalPortal from '../../share/ModalPortal';
import { throttle } from '../../utils/Throttle';
const MainContainer = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const AnimatedSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;

function Main() {
  const [activeSection, setActiveSection] = useState(1);

  const handleScrollToSection = (section: number) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const handleWheel = throttle((event: WheelEvent) => {
      event.preventDefault();

      const scrollPosition = window.scrollY;

      if (event.deltaY < 0 && activeSection > 1) {
        setActiveSection(activeSection - 1);
      } else if (event.deltaY > 0 && activeSection < 5) {
        setActiveSection(activeSection + 1);
      }

      setTimeout(() => {
        window.scrollTo({ top: scrollPosition });
      }, 0);
    }, 1000);

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll('.section'));
      const sectionOffsets = sections.map(
        (section) => section.getBoundingClientRect().top + window.pageYOffset
      );

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const activeIndex = sectionOffsets.findIndex((offset) => offset > scrollPosition);

      if (activeIndex !== -1) {
        setActiveSection(activeIndex + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <ModalPortal>
        <MainSidebar activeSection={activeSection} handleScrollToSection={handleScrollToSection} />
      </ModalPortal>
      <AnimatedSection className={activeSection === 1 ? 'active' : ''}>
        <MainSection1 id={'section1'} />
      </AnimatedSection>
      <AnimatedSection className={activeSection === 2 ? 'active' : ''}>
        <MainSection2 id={'section2'} isActive={activeSection === 2} />
      </AnimatedSection>
      <AnimatedSection className={activeSection === 3 ? 'active' : ''}>
        <MainSection3 id={'section3'} isActive={activeSection === 3} />
      </AnimatedSection>
      <AnimatedSection className={activeSection === 4 ? 'active' : ''}>
        <MainSection4 id={'section4'} isActive={activeSection === 4} />
      </AnimatedSection>
      <AnimatedSection className={activeSection === 5 ? 'active' : ''}>
        <MainSection5 id={'section5'} />
      </AnimatedSection>
    </MainContainer>
  );
}

export default Main;

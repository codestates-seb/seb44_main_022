import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactFullpage from '@fullpage/react-fullpage';

import {
  section1_1,
  section1_2,
  section1_3,
  section1_4,
  section3_1,
  section3_2,
} from '../../assets/images/img_main/img_main';

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  arrow: false,
  centerPadding: '40px',
};

const Section1_img = styled.img`
  width: 100%;
  height: 750px;
  object-fit: cover;
`;
const Section1 = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Section3Icon = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Section3Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;

  .back {
    background: royalblue;
    transform: rotateY(180deg);
  }
`;

const Section3 = styled.div`
  width: 200px;
  height: 250px;
  position: relative;
  perspective: 1100px;
  margin: 2rem;

  &:hover ${Section3Card} {
    transform: rotateY(180deg);
  }
`;

const Body = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
`;
const MainRoot = styled.div`
  background-color: #fffffc;
  width: 100%;
  margin-top: 80px;
  text-align: left;
  font-size: 22px;
`;
const SliderItem = styled.div`
  position: relative;
`;

const TextOverlay = styled.button`
  background-color: white;
  color: #7b78e0;
  padding: 15px;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid;
  border-radius: 25px;
  border-color: var(--purple);
`;
const Section2 = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const slideAnimation = keyframes`
  from {
    left: -150px;
    opacity: 0;
  }
  to {
    left: 150px;
    opacity: 1;
  }
`;

const disappearAnimation = keyframes`
  from {
    left: 150px;
    opacity: 1;
  }
  to {
    left: -150px;
    opacity: 0;
  }
`;

const Section2Text = styled.div`
  font-size: 3em;
  width: 258px;
  color: black;
  font-family: sans-serif;
  position: absolute;
  top: 40%;
  left: 10%;
  animation: ${slideAnimation} 2s ease-in-out forwards;

  &.disappear {
    animation: ${disappearAnimation} 1s ease-out forwards;
  }
`;

function Main() {
  const section2TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      console.log('scrollY', value);
      if (value >= 200 && value <= 1200) {
        if (section2TextRef.current) {
          section2TextRef.current.classList.remove('disappear');
        }
      } else {
        if (section2TextRef.current) {
          section2TextRef.current.classList.add('disappear');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const sliderItems = [
    { src: section1_1, text: 'BUYTE가 처음이신가요?' },
    { src: section1_2, text: 'BUYTE가 처음이신가요?' },
    { src: section1_3, text: 'BUYTE가 처음이신가요?' },
    { src: section1_4, text: 'BUYTE가 처음이신가요?' },
  ];

  return (
    <MainRoot>
      <ReactFullpage
        scrollingSpeed={1000}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Body>
                  <Section1>
                    <Slider {...settings}>
                      {sliderItems.map((item, index) => (
                        <SliderItem key={index}>
                          <Section1_img src={item.src} />
                          <TextOverlay>{item.text}</TextOverlay>
                        </SliderItem>
                      ))}
                    </Slider>
                  </Section1>
                </Body>
              </div>
              <div className="section">
                <Section2>
                  <Section2Text ref={section2TextRef}>커스텀할 수 있씀</Section2Text>
                </Section2>
              </div>
              <div className="section">
                <Section3>
                  <Section3Card className="card">
                    <Section3Icon className="front" src={section3_1} />
                    <Section3Icon className="back" src={section3_2} />
                  </Section3Card>
                </Section3>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </MainRoot>
  );
}

export default Main;

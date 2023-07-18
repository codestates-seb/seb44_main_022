import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import {
  section1_1,
  section1_2,
  section1_3,
  section1_4,
} from '../../assets/images/img_main/img_main';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function NextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        backgroundColor: 'transparent',
        right: '0',
        width: '150px',
        height: '50px',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" style={{ fontSize: '48px', color: 'grey' }} />
    </div>
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        backgroundColor: 'transparent',
        left: '20px',
        zIndex: 2,
        width: '50px',
        height: '50px',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ fontSize: '48px', color: 'grey' }} />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Section1_img = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const SliderItem = styled.div`
  position: relative;
`;

function MainSection1() {
  const sliderItems = [
    { src: section1_1, text: 'Text image 1' },
    { src: section1_2, text: 'Text image 2' },
    { src: section1_3, text: 'Text image 3' },
    { src: section1_4, text: 'Text image 4' },
  ];
  return (
    <div className="section" style={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
      <div style={{ width: '100%', overflow: 'hidden', textAlign: 'center' }}>
        <Slider {...settings}>
          {sliderItems.map((item, index) => (
            <SliderItem key={index}>
              <Section1_img src={item.src} />
              <h1
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#ffffff',
                  fontSize: '3em',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {item.text}
              </h1>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MainSection1;

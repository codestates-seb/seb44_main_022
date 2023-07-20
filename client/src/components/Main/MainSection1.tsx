import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { section1_1, section1_2, section1_3 } from '../../assets/images/img_main/img_main';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const NextArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      right: '0',
      width: '150px',
      height: '50px',
    }}
    onClick={onClick}
  />
);

const PrevArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      left: '120px',
      zIndex: 2,
      width: '50px',
      height: '50px',
    }}
    onClick={onClick}
  />
);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Section1_img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderItem = styled.div`
  position: relative;
  height: 100vh;
`;

function MainSection1({ id, className }: { id: string; className?: string }) {
  const sliderItems = [
    { src: section1_1, text: 'Text image 1' },
    { src: section1_2, text: 'Text image 2' },
    { src: section1_3, text: 'Text image 3' },
  ];
  return (
    <div id={id} className={`section1 ${className}`}>
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
  );
}

export default MainSection1;

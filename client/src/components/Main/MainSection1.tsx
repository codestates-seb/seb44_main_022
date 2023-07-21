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
  autoplaySpeed: 2500,
};

const Section1_img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderItem = styled.div`
  position: relative;
  height: 100vh;
  background-color: gray;
`;
function MainSection1({ id, className }: { id: string; className?: string }) {
  const sliderItems = [
    { src: section1_1, text: 'BUYTE,\n딱 맞는 맛과 조합을 선사합니다.' },
    { src: section1_2, text: 'BUYTE,\n당신을 위한 특별한 빵.' },
    { src: section1_3, text: '맛과 상상력의 조화,\nBUYTE에서 경험해보세요.' },
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
                bottom: '70px',
                left: '30px',
                color: 'white',
                fontSize: '4em',
                fontFamily: 'jalnan',
                textAlign: 'left',
                fontWeight: 'bold',
                padding: '20px',
              }}
            >
              {item.text.split('\n').map((line, index) => (
                <span key={index} style={{ color: 'white', lineHeight: '1.3' }}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
}

export default MainSection1;

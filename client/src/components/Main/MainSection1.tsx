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

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
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
  height: 100vh;
  object-fit: cover;
`;

const SliderItem = styled.div`
  position: relative;
`;

function MainSection1() {
  const sliderItems = [
    { src: section1_1 },
    { src: section1_2 },
    { src: section1_3 },
    { src: section1_4 },
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
                buyte
              </h1>
            </SliderItem>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MainSection1;

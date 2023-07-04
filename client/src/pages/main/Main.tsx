import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Header from '../../share/Header';
import Footer from '../../share/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  section1_1,
  section1_2,
  section1_3,
  section1_4,
  section2,
  section3_1,
  section3_2,
  section3_3,
  section3_4,
  section3_5,
  divimgbox,
  divimgbox1,
  divimgbox2,
  divimgbox3,
  divimgbox4,
  heading,
} from '../../assets/images/img_main/img_main';

const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  arrow: false,
  centerPadding: '40px',
};

const BodyContainer = styled.div`
  position: absolute;
  top: 3458px;
  left: calc(50% - 839px);
  width: 100%;
  height: 276px;
  overflow: hidden;
  opacity: 0.99;
`;
const Secion2Img = styled.img`
  position: absolute;
  top: 959px;
  left: 1px;
  width: 1920px;
  height: 820px;
  object-fit: cover;
`;
const Heading2 = styled.div`
  position: absolute;
  top: 81px;
  left: 832.83px;
  letter-spacing: -0.46px;
  width: 114.53px;
  height: 31px;
`;
const Heading1TitleReviewpng = styled.img`
  position: absolute;
  top: -11px;
  left: calc(50% - 105px);
  width: 210px;
  height: 68px;
  object-fit: cover;
`;
const ReviewText = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  width: 1780px;
  height: 114.5px;
`;

const Abcd = styled.div`
  position: absolute;
  top: -2.5px;
  left: 0px;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  width: 98.25px;
  height: 27px;
`;
const PproductName = styled.div`
  position: absolute;
  top: 20px;
  left: 0px;
  width: 340px;
  height: 22.8px;
  overflow: hidden;
`;
const Won = styled.b`
  position: absolute;
  top: -3px;
  left: 0px;
  line-height: 26.4px;
  display: flex;
  align-items: center;
  width: 125.03px;
  height: 32px;
`;
const Divprice = styled.div`
  position: absolute;
  top: 52.8px;
  left: 0px;
  width: 340px;
  height: 26.39px;
  font-size: var(--font-size-3xl);
`;
const Section4Box = styled.div`
  position: absolute;
  display: flex;
  top: 340px;
  left: 0px;
  width: 340px;
  height: 99.19px;
`;
const DivimgBoxIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 310px;
  height: 310px;
  overflow: hidden;
  object-fit: cover;
`;
const Link1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100;
  height: 439.19px;
`;
const Abcd1 = styled.div`
  position: absolute;
  top: -3px;
  left: 0px;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  width: 280.59px;
  height: 27px;
`;
const Link2 = styled.div`
  position: absolute;
  top: 0px;
  left: 360px;
  width: 340px;
  height: 439.19px;
`;
const Abcd2 = styled.div`
  position: absolute;
  top: -3px;
  left: 0px;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  width: 140.73px;
  height: 27px;
`;
const Link3 = styled.div`
  position: absolute;
  top: 0px;
  left: 720px;
  width: 340px;
  height: 439.19px;
`;
const Abcd3 = styled.div`
  position: absolute;
  top: -3px;
  left: 0px;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  width: 217.95px;
  height: 27px;
`;
const Link4 = styled.div`
  position: absolute;
  top: 0px;
  left: 1080px;
  width: 340px;
  height: 439.19px;
`;
const Abcd4 = styled.div`
  position: absolute;
  top: -3px;
  left: 0px;
  line-height: 22.8px;
  display: flex;
  align-items: center;
  width: 119.93px;
  height: 27px;
`;
const Link5 = styled.div`
  position: absolute;
  top: 0px;
  left: 1440px;
  width: 340px;
  height: 439.19px;
`;
const Section4Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Section4Container = styled.div`
  display: flex;
  position: relative;
  top: 210px;
  width: 100%;
  height: 420px;
  overflow: hidden;
  text-align: left;
`;

const Section4 = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  top: 2500px;
  left: 50%;
  transform: translateX(-50%);
  height: 100vh;
  width: 100vw;

  @media (max-width: 1200px) {
    left: 45%;
  }

  @media (max-width: 768px) {
    left: 40%;
  }

  @media (max-width: 480px) {
    left: 35%;
  }
`;

const Section1_img = styled.img`
  top: 0px;
  width: 100%;
  height: 750px;
  object-fit: cover;
`;
const Section1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
const Section31Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 375.2px;
  height: 735px;
  overflow: hidden;
  object-fit: cover;
`;
const Section33Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 792.4px;
  width: 377.2px;
  height: 735px;
  overflow: hidden;
  object-fit: cover;
`;
const Section34Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 1189.6px;
  width: 377.2px;
  height: 735px;
  overflow: hidden;
  object-fit: cover;
`;
const Section35Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 1586.8px;
  width: 377.2px;
  height: 735px;
  overflow: hidden;
  object-fit: cover;
`;
const Section32Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 395.2px;
  width: 377.2px;
  height: 735px;
  object-fit: cover;
`;
const Section3 = styled.div`
  position: absolute;
  top: calc(50% + 149px);
  left: calc(50% - 955px);
  width: 1920px;
  height: 735px;
`;
const Body = styled.div`
  position: absolute;
  top: 160px;
  left: 0px;
  width: 100%;
  height: 3260px;
  overflow: hidden;
  text-align: center;
`;
const MainRoot = styled.div`
  position: absolute;
  background-color: #fffffc;
  width: 100%;
  height: 3660px;
  text-align: left;
  font-size: 22px;
`;
const SliderItem = styled.div`
  position: relative;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  font-size: 16px;
`;
const Main: FunctionComponent = () => {
  return (
    <MainRoot>
      <Footer />
      <Header />
      <Body>
        <BodyContainer />
        <Secion2Img alt="" src={section2} />
        <Section4>
          <ReviewText>
            <Heading2>인기 메뉴</Heading2>
            <Heading1TitleReviewpng alt="" src={heading} />
          </ReviewText>
          <Section4Container>
            <Section4Wrapper>
              <Link1>
                <Section4Box>
                  <PproductName>
                    <Abcd>abcd</Abcd>
                  </PproductName>
                  <Divprice>
                    <Won>31,000 won</Won>
                  </Divprice>
                </Section4Box>
                <DivimgBoxIcon alt="" src={divimgbox} />
              </Link1>
              <Link2>
                <Section4Box>
                  <PproductName>
                    <Abcd1>abcd</Abcd1>
                  </PproductName>
                  <Divprice>
                    <Won>68,000 won</Won>
                  </Divprice>
                </Section4Box>
                <DivimgBoxIcon alt="" src={divimgbox1} />
              </Link2>
              <Link3>
                <Section4Box>
                  <PproductName>
                    <Abcd2>abcd</Abcd2>
                  </PproductName>
                  <Divprice>
                    <Won>20,000 won</Won>
                  </Divprice>
                </Section4Box>
                <DivimgBoxIcon alt="" src={divimgbox2} />
              </Link3>
              <Link4>
                <Section4Box>
                  <PproductName>
                    <Abcd3>abcd</Abcd3>
                  </PproductName>
                  <Divprice>
                    <Won>46,000 won</Won>
                  </Divprice>
                </Section4Box>
                <DivimgBoxIcon alt="" src={divimgbox3} />
              </Link4>
              <Link5>
                <Section4Box>
                  <PproductName>
                    <Abcd4>abcd</Abcd4>
                  </PproductName>
                  <Divprice>
                    <Won>52,000 won</Won>
                  </Divprice>
                </Section4Box>
                <DivimgBoxIcon alt="" src={divimgbox4} />
              </Link5>
            </Section4Wrapper>
          </Section4Container>
        </Section4>
        <Section1>
          <Slider {...settings}>
            <SliderItem>
              <Section1_img alt="" src={section1_1} />
              <TextOverlay>BUYTE가 처음이신가요?</TextOverlay>
            </SliderItem>
            <SliderItem>
              <Section1_img alt="" src={section1_2} />
              <TextOverlay>BUYTE가 처음이신가요?</TextOverlay>
            </SliderItem>
            <SliderItem>
              <Section1_img alt="" src={section1_3} />
              <TextOverlay>BUYTE가 처음이신가요?</TextOverlay>
            </SliderItem>
            <SliderItem>
              <Section1_img alt="" src={section1_4} />
              <TextOverlay>BUYTE가 처음이신가요?</TextOverlay>
            </SliderItem>
          </Slider>
        </Section1>
        <Section3>
          <Section31Icon alt="" src={section3_1} />
          <Section33Icon alt="" src={section3_2} />
          <Section34Icon alt="" src={section3_3} />
          <Section35Icon alt="" src={section3_4} />
          <Section32Icon alt="" src={section3_5} />
        </Section3>
      </Body>
    </MainRoot>
  );
};

export default Main;

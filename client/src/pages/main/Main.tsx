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
  divimgbox2,
  divimgbox3,
  divimgbox4,
  heading,
} from '../../assets/images/img_main/img_main';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '20px',
};

const DivswiperContainer = styled.div`
  position: absolute;
  top: 3458px;
  left: calc(50% - 839px);
  width: 1680px;
  height: 276px;
  overflow: hidden;
  opacity: 0.99;
`;
const Section2Icon = styled.img`
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
  line-height: 34.5px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  top: 0px;
  left: 20px;
  width: 1780px;
  height: 114.5px;
`;
const SeeMore = styled.div`
  position: relative;
  font-weight: 500;
`;
const BtnSeemore = styled.div`
  position: absolute;
  top: calc(50% + 288.69px);
  left: calc(50% - 95.22px);
  border-radius: 800px;
  background-color: var(--color-white);
  border: 1px solid var(--color-cornflowerblue);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: var(--padding-smi) 41.41999816894531px var(--padding-smi) 41px;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 0.96;
  min-width: 110px;
  font-size: var(--font-size-3xl);
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
const DivtxtBox = styled.div`
  position: absolute;
  top: 340px;
  left: 0px;
  width: 340px;
  height: 99.19px;
`;
const DivimgBoxIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 340px;
  height: 340px;
  overflow: hidden;
  object-fit: cover;
`;
const Link1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 340px;
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
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
const Section4Container = styled.div`
  position: absolute;
  top: 126px;
  left: calc(50% - 890px);
  width: 1780px;
  height: 439.19px;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-lgi);
  color: var(--color-gray-100);
`;
const Section4 = styled.div`
  position: absolute;
  top: 2541px;
  left: calc(50% - 905px);
  width: 1820px;
  height: 691.69px;
`;
const Section11Icon = styled.img`
  position: absolute;
  top: -740px;
  left: 0px;
  width: 1920px;
  height: 960px;
  object-fit: cover;
`;
const Buyte = styled.div`
  position: absolute;
  top: 19.8px;
  left: 28.86px;
  letter-spacing: -0.66px;
  line-height: 26.4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 222.47px;
  height: 29px;
`;
const Link = styled.div`
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 138.8px);
  border-radius: 70px;
  background-color: var(--color-white);
  border: 1px solid var(--color-dimgray-100);
  box-sizing: border-box;
  width: 280px;
  height: 70px;
`;
const BtnIntroduce = styled.div`
  position: absolute;
  height: calc(100% - 890px);
  width: calc(100% - 5750px);
  top: 740px;
  right: 5750px;
  bottom: 150px;
  left: 0px;
`;
const DivswiperContainerIcon = styled.img`
  position: absolute;
  top: 0px;
  left: calc(50% - 3835px);
  width: 1920px;
  height: 960px;
  overflow: hidden;
`;
const Section12Icon = styled.img`
  top: 0px;
  width: 100%;
  height: 960px;
  object-fit: cover;
`;
const Section13Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 3840px;
  width: 1920px;
  height: 960px;
  object-fit: cover;
`;
const Section14Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 5760px;
  width: 1920px;
  height: 960px;
  object-fit: cover;
`;
const Section1 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #000;
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
const Main: FunctionComponent = () => {
  return (
    <MainRoot>
      <Footer />
      <Header />
      <Body>
        <DivswiperContainer />
        <Section2Icon alt="" src="/section2@2x.png" />
        <Section4>
          <ReviewText>
            <Heading2>인기 메뉴</Heading2>
            <Heading1TitleReviewpng alt="" src="./heading-1--title-reviewpng@2x.png" />
          </ReviewText>
          <BtnSeemore>
            <SeeMore>SEE MORE</SeeMore>
          </BtnSeemore>
          <Section4Container>
            <Section4Wrapper>
              <Link1>
                <DivtxtBox>
                  <PproductName>
                    <Abcd>abcd</Abcd>
                  </PproductName>
                  <Divprice>
                    <Won>31,000 won</Won>
                  </Divprice>
                </DivtxtBox>
                <DivimgBoxIcon alt="" src="./divimgbox@2x.png" />
              </Link1>
              <Link2>
                <DivtxtBox>
                  <PproductName>
                    <Abcd1>abcd</Abcd1>
                  </PproductName>
                  <Divprice>
                    <Won>68,000 won</Won>
                  </Divprice>
                </DivtxtBox>
                <DivimgBoxIcon alt="" src="/divimgbox1@2x.png" />
              </Link2>
              <Link3>
                <DivtxtBox>
                  <PproductName>
                    <Abcd2>abcd</Abcd2>
                  </PproductName>
                  <Divprice>
                    <Won>20,000 won</Won>
                  </Divprice>
                </DivtxtBox>
                <DivimgBoxIcon alt="" src="/divimgbox2@2x.png" />
              </Link3>
              <Link4>
                <DivtxtBox>
                  <PproductName>
                    <Abcd3>abcd</Abcd3>
                  </PproductName>
                  <Divprice>
                    <Won>46,000 won</Won>
                  </Divprice>
                </DivtxtBox>
                <DivimgBoxIcon alt="" src="/divimgbox3@2x.png" />
              </Link4>
              <Link5>
                <DivtxtBox>
                  <PproductName>
                    <Abcd4>abcd</Abcd4>
                  </PproductName>
                  <Divprice>
                    <Won>52,000 won</Won>
                  </Divprice>
                </DivtxtBox>
                <DivimgBoxIcon alt="" src="/divimgbox4@2x.png" />
              </Link5>
            </Section4Wrapper>
          </Section4Container>
        </Section4>
        <Section1>
          <Slider {...settings}>
            <Section12Icon alt="" src={section1_1} />
            <Section12Icon alt="" src={section1_2} />
            <Section12Icon alt="" src={section1_1} />
          </Slider>
        </Section1>
        <Section3>
          <Section31Icon alt="" src="./section3-1@2x.png" />
          <Section33Icon alt="" src="./section3-3@2x.png" />
          <Section34Icon alt="" src="./section3-4@2x.png" />
          <Section35Icon alt="" src="/section3-5@2x.png" />
          <Section32Icon alt="" src="/section3-2@2x.png" />
        </Section3>
      </Body>
    </MainRoot>
  );
};

export default Main;

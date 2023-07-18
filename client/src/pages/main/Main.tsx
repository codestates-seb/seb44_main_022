/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components';
import MainSection1 from '../../components/Main/MainSection1';
import MainSection2 from '../../components/Main/MainSection2';
import MainSection3 from '../../components/Main/MainSection3';
import MainSidebar from '../../components/Main/MainSidebar';

const MainRoot = styled.div`
  background-color: #fffffc;
  width: 100%;
  margin-top: 80px;
  text-align: left;
  font-size: 22px;
  min-height: calc(120vh - 80px - HeaderHeight - FooterHeight);
`;

function Main() {
  const FullPageComponent = ReactFullpage as any;
  const [api, setApi] = useState<any>(null);
  const [activeSection, setActiveSection] = useState(1);

  return (
    <>
      <MainRoot>
        <FullPageComponent
          scrollingSpeed={1000}
          afterLoad={(origin: any, destination: any, direction: any) => {
            setActiveSection(destination.index + 1);
          }}
          render={({ fullpageApi }: { fullpageApi: any }) => {
            if (!api) setApi(fullpageApi);
            return (
              <ReactFullpage.Wrapper>
                <MainSection1 />
                <MainSection2 />
                <MainSection3 />
              </ReactFullpage.Wrapper>
            );
          }}
        />
        {api && <MainSidebar fullpageApi={api} activeSection={activeSection} />}
      </MainRoot>
    </>
  );
}

export default Main;

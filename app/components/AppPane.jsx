import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { connect, Provider } from 'react-redux'
import Tuner from './Tuner';
import ControlPanel from './ControlPanel';
import ColtraneChart from './ColtraneChart';
import GuitarTab from './GuitarTab';

// Styles are defined as components that wrap other components
const AppPaneWrapper = styled.section`
`

const HeaderPane = styled.header ``

const FooterPane = styled.header ``

const MainPane = styled.div `
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  margin: 25px;
`

const MajorPane = styled.section`
  display: flex;
  flex: 1;
`

const TopAnchoredPane = styled.section`
  flex-grow: 1;
`

const MinorPane = styled.section`
  flex-basis: 200px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-left: 1px solid #ddd;
`

 const AppPane = ({store}) => {
  return (
    <Provider store={store}>
      <AppPaneWrapper>
        <TopAnchoredPane>
          <GuitarTab store={store} />
          <Tuner store={store} />
        </TopAnchoredPane>
        <MainPane>  
          <ColtraneChart store={store} />
          <MinorPane><ControlPanel store={store} /></MinorPane>
        </MainPane>
      </AppPaneWrapper>
    </Provider>
  );
}

AppPane.propTypes = {
  store: PropTypes.object.isRequired,
}

export default connect(state => state)(AppPane)
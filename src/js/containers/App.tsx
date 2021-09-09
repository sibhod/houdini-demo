import React from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from 'components/Button';

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100%;
`;

const Nav = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  padding: 20px;
  margin: auto;
  max-width: 400px;
  width: 100%;
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Content = styled.div`
  font-size: 50vw;
  text-align: center;
`;

const PATHS = ['🤔', '😰', '🦄', '🍖', '🍕'];

export const App = () => {
  const location = useLocation();

  return (
    <Container>
      <Nav>
        {PATHS.map(s => (
          <Link to={`/${s}`} key={s}>
            <Button>{s}</Button>
          </Link>
        ))}
      </Nav>
      <ContentContainer>
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            {PATHS.map(s => (
              <Route exact path={`/${s}`} key={s}>
                <Test>{s.toUpperCase()}</Test>
              </Route>
            ))}
            <Route>
              <Redirect to={`/${PATHS[0]}`} />
            </Route>
          </Switch>
        </AnimatePresence>
      </ContentContainer>
    </Container>
  );
};

const varients = {
  start: {
    y: -20,
    opacity: 0,
  },
  in: {
    y: 0,
    opacity: 1,
    transition: { ease: 'circOut', duration: 0.3 },
  },
  out: {
    y: 20,
    opacity: 0,
    transition: { ease: 'circOut', duration: 0.2 },
  },
};

const Test = ({ children }) => {
  return (
    <motion.div
      style={{ position: 'absolute', top: 0, width: '100%' }}
      variants={varients}
      initial='start'
      animate='in'
      exit='out'
    >
      <Content>{children}</Content>
    </motion.div>
  );
};

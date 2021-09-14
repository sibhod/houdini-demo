import React from 'react';
import styled, { Interpolation, keyframes } from 'styled-components';

import { usePaintWorklet } from 'usePaintWorklet';
import { StripesPaintProgram } from 'StripesPaintProgram';
import 'css-paint-polyfill';

const colors = ['#1C0658', '#5C2686', '#FF1690', '#F4D676', '#36CDC4'];

const Container = styled.div`
  background-color: #dff1e3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

interface PaintProps {
  readonly css?: Interpolation<any>;
}

const loop = keyframes`
  0% {
    --progress: 0%;
    --fill: ${colors[1]};
    --stripe-color: ${colors[2]};
    background-position-x: 0px;
    letter-spacing: -0.1em;
  }
  25% {
    --progress: 100%;
    --fill: ${colors[1]};
    --stripe-color: ${colors[2]};
    background-position-x: calc(var(--size) * -1);
  }
  25.01% {
    --progress: 0%;
    --fill: ${colors[2]};
    --stripe-color: ${colors[3]};
  }
  50% {
    --progress: 100%;
    --fill: ${colors[2]};
    --stripe-color: ${colors[3]};
    background-position-x: calc(var(--size) * 0.5);
    letter-spacing: -0.115em;
  }
  50.01% {
    --progress: 0%;
    --fill: ${colors[3]};
    --stripe-color: ${colors[4]};
  }
  75% {
    --progress: 100%;
    --fill: ${colors[3]};
    --stripe-color: ${colors[4]};
    background-position-x: calc(var(--size) * -1);
  }
  75.01% {
    --progress: 0%;
    --fill: ${colors[4]};
    --stripe-color: ${colors[1]};
  }
  100% {
    --progress: 100%;
    --fill: ${colors[4]};
    --stripe-color: ${colors[1]};
    background-position-x: 0;
    letter-spacing: -0.1em;
  }
`;

const Text = styled.div<PaintProps>`
  --progress: 0%;
  --size: 32px;
  --fill: #9afff0;
  color: transparent;
  font-size: 10em;
  font-family: 'Work Sans', sans-serif;
  letter-spacing: -0.1em;
  line-height: 0.75em;
  background-clip: text;
  background-size: var(--size) var(--size);
  -webkit-background-clip: text;
  padding-bottom: 40px;
  &:hover {
    animation: ${loop} 2s cubic-bezier(0.515, 1.65, 0.535, -0.6) infinite;
  }
  &::selection {
    background: #f6f79290;
  }
  ${props => props.css};
`;

export const App = () => {
  const program = usePaintWorklet(StripesPaintProgram);

  return (
    <Container>
      <Text css={program.css}>
        Almost before we knew it, we had left the ground.
      </Text>
    </Container>
  );
};

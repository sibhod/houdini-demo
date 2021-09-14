import React from 'react';
import styled, { Interpolation } from 'styled-components';

import { usePaintWorklet } from 'usePaintWorklet';
import { StripesPaintProgram } from 'StripesPaintProgram';
import 'css-paint-polyfill';

const Container = styled.div`
  background-color: #daede2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface PaintProps {
  readonly css?: Interpolation<any>;
}

const Text = styled.div<PaintProps>`
  --progress: 0%;
  --size: 32px;
  --fill: #77c4d3;
  --stripe-color: #ea2e49;
  color: transparent;
  font-size: 10em;
  font-family: 'Work Sans', sans-serif;
  line-height: 0.75em;
  background-clip: text;
  background-size: var(--size) var(--size);
  -webkit-background-clip: text;
  padding-bottom: 40px;
  transition: --progress 0.3s ease-out;
  &:hover {
    --progress: 100%;
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

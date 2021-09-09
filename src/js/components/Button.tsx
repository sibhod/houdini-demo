import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonEl = styled.button`
  font-size: 3em;
`;

interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return <ButtonEl>{children}</ButtonEl>;
};

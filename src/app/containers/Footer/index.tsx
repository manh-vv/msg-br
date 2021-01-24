/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {}

export const Footer = memo((props: Props) => {
  return (
    <>
      <Div>
        <a href="mailto:mkaori.star@gmail.com" className="fs-6 fw-lighter">
          ® email
        </a>
      </Div>
    </>
  );
});

const Div = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 64px;
  padding-left: 2em;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
`;

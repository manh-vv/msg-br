import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../Footer';
import { OriginalMsg } from '../OriginalMsg';
import { ParsedMsg } from '../ParsedMsg';
import styled from 'styled-components/macro';

export function HomePage() {
  return (
    <Div>
      <Helmet>
        <title>bot</title>
      </Helmet>
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-3">
            <OriginalMsg />
          </div>
          <div className="col-md-9">
            <ParsedMsg />
          </div>
        </div>
      </div>
      <Footer />
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  height: 100vh;
`;

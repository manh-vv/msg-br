import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { OriginalMsg } from '../OriginalMsg';
import { ParsedMsg } from '../ParsedMsg';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
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
    </>
  );
}

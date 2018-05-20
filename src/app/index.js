/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';

// Import your global styles here
import 'normalize.css/normalize.css'; // eslint-disable-line import/first
import styles from './styles.scss';

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div className={styles.App}>
    <div className={styles.header}>
      <img src={require('./assets/logo.svg')} alt="Logo" role="presentation" />
    </div>
    <hr />
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

export default hot(module)(App);

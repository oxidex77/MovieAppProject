import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import Layout from './app/_layout';

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;

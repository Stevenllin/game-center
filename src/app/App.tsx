import React from 'react';
import store from 'app/store';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
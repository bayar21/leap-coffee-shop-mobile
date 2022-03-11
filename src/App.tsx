import React from 'react';
import RootNavigationContainer from './navigations';
import {StoreProvider, CartProvider, AuthProvider} from './contexts';

const App = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          <RootNavigationContainer />
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;

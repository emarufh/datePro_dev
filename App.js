/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import {ModalPortal} from 'react-native-modals';
import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <>
          <StackNavigator />
          <ModalPortal />
        </>
      </AuthProvider>
    </>
  );
}

export default App;

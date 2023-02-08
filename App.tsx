import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet} from 'react-native';
import AppNavigator from './src/routes/AppStack';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

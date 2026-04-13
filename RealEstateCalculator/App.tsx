import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { store, persistor } from './src/state/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { appTheme } from './src/config/theme';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={appTheme}>
          <AppNavigator />
          <StatusBar style="auto" />
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

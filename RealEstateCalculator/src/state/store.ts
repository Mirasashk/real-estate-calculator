import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import propertyReducer from './slices/propertySlice';
import settingsReducer from './slices/settingsSlice';

const propertyPersistConfig = {
  key: 'properties',
  storage: AsyncStorage,
};

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    properties: persistReducer(propertyPersistConfig, propertyReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

const enhancer = compose(applyMiddleware(thunk, createLogger({})));
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['AuthenticateReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

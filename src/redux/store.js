import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import weatherReducer from './weatherReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const roorReducer = combineReducers({
  state: weatherReducer,
})
const persistedReducer = persistReducer(persistConfig, roorReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
const persistor = persistStore(store)
export { store, persistor }

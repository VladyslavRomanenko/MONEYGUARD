// import {
//   persistStore,
//   //   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';
// import { configureStore } from '@reduxjs/toolkit';

// // const persistConfig = {
// //   key: 'todos',
// //   storage,
// //   whitelist: ['token'],
// // };

// // const persistedReducer = persistReducer(persistConfig, todoReducer);

// export const store = configureStore({
//   reducer: {
//     // todo: todoReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { appStarted } from "./appStarted";
import authReducer from "@auth/store/slices/authSlice";
import themeReducer from "@theme/store/themeSlice";
import reactotron from "@/core/config/reactotron.config";

// TODO: Importar tus slices aquí
// import authReducer from "@/features/auth/model/auth.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["auth", "theme"], // Persiste auth y theme
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    enhancers: (getDefaultEnhancers) =>
        __DEV__ && reactotron.createEnhancer
            ? getDefaultEnhancers().concat(reactotron.createEnhancer())
            : getDefaultEnhancers(),
});

export const persistor = persistStore(store);
store.dispatch(appStarted() as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
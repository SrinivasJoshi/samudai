import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import cyrptoReducer from '../features/crypto/cryptoSlice';

export const store = configureStore({
	reducer: {
		crypto: cyrptoReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

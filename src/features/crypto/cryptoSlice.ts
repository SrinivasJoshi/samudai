import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CryptoState {
	address: string;
	chainId: number;
}

const initialState: CryptoState = {
	address: '',
	chainId: 1,
};

export const cryptoSlice = createSlice({
	name: 'crypto',
	initialState,
	reducers: {
		addAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
		addChainId: (state, action: PayloadAction<number>) => {
			state.chainId = action.payload;
		},
	},
});
export const selectAddress = (state: RootState) => state.crypto.address;
export const selectChainId = (state: RootState) => state.crypto.chainId;

export const { addAddress, addChainId } = cryptoSlice.actions;
export default cryptoSlice.reducer;

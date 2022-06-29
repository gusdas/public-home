import { createSlice } from '@reduxjs/toolkit'

const initialState = { naver: undefined };

const naverSlice = createSlice({
    name: 'naver',
    initialState,
    reducers: {
        setNaver(state, action) {
            state.naver = action.payload;
        }
    }
});

export const { setNaver } = naverSlice.actions;
export default naverSlice.reducer;
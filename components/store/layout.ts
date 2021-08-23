import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from './';

interface LayoutState {
    isDrawerOpen: boolean;
}

const initialState: LayoutState = {
    isDrawerOpen: false,
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers:{
        toggleDrawerOpen: state => {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
        closeDrawer: state => {
            state.isDrawerOpen = false;
        }
    }
})

export const { toggleDrawerOpen, closeDrawer } = layoutSlice.actions;

export const selectDrawerOpen = (state: RootState) => {return state.layout.isDrawerOpen};

export default layoutSlice.reducer;
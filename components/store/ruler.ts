import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '.';

interface RulerState {
    columns: Array<number>
}

const initialState: RulerState = {
    columns: [1,2,3,5,8,13]
}

export const ticketSlice = createSlice({
    name: 'ruler',
    initialState,
    reducers:{
        addColumn: (state, action) => {
            if(action.payload.column){
                state.columns.push(action.payload.column)
            }
            else {
                const len = state.columns.length;
                state.columns.push(state.columns[len-1]+state.columns[len-2]);
            }
        },
        // removeColumn: (state, action) => {
            
        // }
    }
})

export const { addColumn } = ticketSlice.actions;

export const selectColumns = (state: RootState) => {
    return state.ruler.columns;
}
// export const selectDrawerOpen = (state: RootState) => {return state.layout.isDrawerOpen};

export default ticketSlice.reducer;
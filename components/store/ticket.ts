import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '.';

interface Ticket {
    key: string,
    summary: string,
    description?: string,
    points?: number,
    assignee?: string,
    team?: string,
    epic?: string,
    rank?: number,
}

interface Roll {
    [name: string]: Ticket|undefined;
}

interface TicketsState {
    tickets: Roll;
}

const initialState: TicketsState = {
    tickets: {}
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        addTickets: (state, action) => {
            action.payload.tickets.forEach((ticket: Ticket) => {
                state.tickets[ticket.key] = ticket;
            });
        },
        removeTickets: (state, action) => {
            action.payload.tickets.forEach((ticket: Ticket) => {
                delete state.tickets[ticket.key];
            });
        },
        resetTickets: (state) => {
            state.tickets = {};
        }
    }
})

export const { addTickets, removeTickets, resetTickets } = ticketSlice.actions;

export const selectTicket = (key: string) => {
    return (state: RootState) => {
        return state.ticket.tickets[key];
    }
}

export const selectTicketIdsByPoints = (points: number) => {
    return (state: RootState) => {
        return Object.keys(state.ticket.tickets).filter((key) => {
            return state.ticket.tickets[key]?.points === points;
        });
    }
}

export const selectAreThereTickets = (state: RootState) => {
    return Object.keys(state.ticket.tickets).length > 0;
}

export default ticketSlice.reducer;
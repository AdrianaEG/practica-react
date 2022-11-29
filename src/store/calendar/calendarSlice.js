import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns/esm';

const tempEvent = {
      _id: new Date().getTime(),
      title: 'Cumpleaños del jefe',
      notes: 'Comprar una torta',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user:{
        _id: '123',
        name: 'Adri'
      }
    }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action ) => {
            state.activeEvent= action.payload
        },
        onAddNewEvent: (state, action)=>{
            state.events.push(action.payload);
            state.activeEvent=null;
        },
        onUpdateEvent: (state, action)=>{
            state.events = state.events.map(event=>{
                if(event._id === action.payload._id){
                    return action.payload
                }
                return event
            })
        },
        onDeleteEvent: (state)=>{
            if(state.activeEvent){
                state.events = state.events.filter(event=> event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
    }
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
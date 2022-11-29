import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = ()=>{
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state=>state.calendar)

    const setActiveEvent = (eventActive)=>{
        dispatch(onSetActiveEvent(eventActive))
    }
    
    const startSavingEvent = async(calendarEvent)=>{
        if(calendarEvent._id){
            //Actualizando
            //console.log('Actualizar nota')
            dispatch(onUpdateEvent(calendarEvent))
        }
        else{
            //Creando
            //console.log('Crear nota')
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = ()=>{
        //Si todo sale bien 
        dispatch(onDeleteEvent())
    }

    return{
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
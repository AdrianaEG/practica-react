import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = ()=>{
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state=>state.calendar)
    const {user} = useSelector(state=>state.auth)

    const setActiveEvent = (eventActive)=>{
        dispatch(onSetActiveEvent(eventActive))
    }
    
    const startSavingEvent = async(calendarEvent)=>{
        try{
            if(calendarEvent.id){
                //Actualizando
                //console.log('Actualizar nota')
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return;
            }
            //Creando
                //console.log('Crear nota')
                const {data} = await calendarApi.post('/events', calendarEvent);
    
                dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        }catch(error){
            console.log(error)
            Swal.fire('error al guardar', error.response.data.msg, 'error')
        }

    }

    const startDeletingEvent = async()=>{
        //Si todo sale bien 
        try{
            await calendarApi.delete(`events/${activeEvent.id}`)
            dispatch(onDeleteEvent())

        }
        catch(error){
            console.log(error)
            Swal.fire('error al eliminar', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async()=>{
        try{
            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDate(data.eventos)
            dispatch(onLoadEvents(events))
            //console.log(events)

        }
        catch(error){
            console.log(error)
            console.log('Error cargando eventos')
        }
    }

    return{
        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'

import {useCalendarStore, useUiStore} from '../../hooks'

export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const eventStyleGetter = (event, start, end, isSelected)=>{
    //console.log({event, start, end, isSelected})

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {style}
  }

  const onDoubleClick = (event)=>{
    //console.log({doubleClick: event})
    openDateModal();
  }

  const onSelect = (event)=>{
    setActiveEvent(event)
  }

  const onViewChanged = (event)=>{
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <NavBar />
      <Calendar
        defaultView={lastView}
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

      />
      <CalendarModal/>
      <FabAddNew/>
      {
        
      }
      <FabDelete/>
    </>
  )
}
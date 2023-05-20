import React, { useEffect, useState } from 'react';
import { getEvents } from '../utils/data/eventData';
import EventCard from '../components/event/EventCard';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <>
      <article className="events">
        <h1>Events</h1>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard description={event.description} time={event.time} date={event.date} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Events;
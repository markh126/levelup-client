import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getEvents } from '../utils/data/eventData';
import EventCard from '../components/event/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  return (
    <>
      <article className="events">
        <h1>Events</h1>
        <Button
          onClick={() => {
            router.push('/events/new');
          }}
        >
          Register New Event
        </Button>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard id={event.id} description={event.description} time={event.time} date={event.date} game={event.game} onUpdate={getAllEvents} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Events;

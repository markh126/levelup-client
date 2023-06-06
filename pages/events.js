import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getEvents } from '../utils/data/eventData';
import EventCard from '../components/event/EventCard';
import { useAuth } from '../utils/context/authContext';

function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

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
        {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((event) => (
            <section key={`event--${event.id}`} className="event">
              <EventCard id={event.id} description={event.description} time={event.time} date={event.date} game={event.game} onUpdate={getAllEvents} joined={event.joined} />
            </section>
          ))}
      </article>
    </>
  );
}

export default Events;

import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  id,
  description, //
  date,
  time,
  onUpdate,
  joined,
}) => {
  const { user } = useAuth();
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const join = () => joinEvent(id, user.uid).then(() => onUpdate());
  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());

  return (
    <Card className="text-center">
      <Card.Header>Event</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Date: {date} Time: {time}</Card.Text>
        <Link href={`/events/edit/${id}`} passHref>
          <Button>Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEvent} className="m-2">
          Delete
        </Button>
        {joined
          ? (
            <Button variant="success" onClick={leave} className="m-2">
              Leave
            </Button>
          )
          : (
            <Button variant="success" onClick={join} className="m-2">
              Join
            </Button>
          )}
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;

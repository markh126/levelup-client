import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  description, //
  date,
  time,
  onUpdate,
}) => {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

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
};

export default EventCard;

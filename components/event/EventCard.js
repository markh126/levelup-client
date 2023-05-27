import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const EventCard = ({
  id,
  description, //
  date,
  time,
}) => (
  <Card className="text-center">
    <Card.Header>Event</Card.Header>
    <Card.Body>
      <Card.Title>{description}</Card.Title>
      <Card.Text>Date: {date} Time: {time}</Card.Text>
      <Link href={`/events/edit/${id}`} passHref>
        <Button>Edit</Button>
      </Link>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;

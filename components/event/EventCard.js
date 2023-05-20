import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description, //
  date,
  time,
}) => (
  <Card className="text-center">
    <Card.Header>Event</Card.Header>
    <Card.Body>
      <Card.Title>{description}</Card.Title>
      <Card.Text>Date: {date} Time: {time}</Card.Text>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import {
  createEvent, getSingleEvent, updateEvent,
} from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  game: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);

    if (obj.id) {
      getSingleEvent(id).then((eventObj) => {
        setCurrentEvent((prevState) => ({
          ...prevState,
          id: eventObj.id,
          description: eventObj.description,
          date: eventObj.date,
          time: eventObj.time,
          game: eventObj.game.id,
        }));
        console.warn(obj);
      });
    }
  }, [obj, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (currentEvent.id) {
      const event = {
        id: currentEvent.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        userId: user.uid,
      };
      updateEvent(event).then(() => router.push('/events'));
    } else {
      const event = {
        id: currentEvent.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: currentEvent.game,
        userId: user.uid,
      };
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        <FloatingLabel controlId="floatingSelect" label="Game">
          <Form.Select
            aria-label="Game"
            name="game"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.game}
            required
          >
            <option value="">Select a Game</option>
            {
            games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                {game.title}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.object,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import {
  createGame, getGameTypes, getSingleGame, updateGame,
} from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 0,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (obj.id) {
      getSingleGame(id).then((gameObj) => {
        setCurrentGame((prevState) => ({
          ...prevState,
          id: gameObj.id,
          skillLevel: gameObj.skill_level,
          numberOfPlayers: gameObj.number_of_players,
          title: gameObj.title,
          maker: gameObj.maker,
          gameType: gameObj.game_type.id,
        }));
        console.warn(obj);
      });
    }
  }, [obj, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (currentGame.id) {
      const game = {
        id: currentGame.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        gamer: user.uid,
      };
      updateGame(game, user.uid).then(() => router.push('/'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        gamer: user.uid,
      };
      createGame(game, user.uid).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <FloatingLabel controlId="floatingSelect" label="Game Type">
          <Form.Select
            aria-label="Game Type"
            name="gameType"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameType}
            required
          >
            <option value="">Select a Game Type</option>
            {
            gameTypes.map((type) => (
              <option
                key={type.id}
                value={type.id}
              >
                {type.label}
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

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gameType: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;

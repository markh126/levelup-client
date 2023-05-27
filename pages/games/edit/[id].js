import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../../components/game/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);

  return (
    <div>
      <h2>Edit Game</h2>
      <GameForm obj={editGame} />
    </div>
  );
}

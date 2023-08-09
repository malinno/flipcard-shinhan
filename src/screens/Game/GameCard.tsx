import { useEffect } from "react";
import { init } from "./game";

const PlayGame: React.FC = () => {
  useEffect(() => {
    const gamePromise = init();
    return () => {
      gamePromise.then((game) => game.dispose());
    };
  }, []);

  return null;
};

export default PlayGame;

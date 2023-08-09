import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./screens/Loading/Loading";
import PlayGame from "./screens/Game/PlayGame";
import Intron from "./screens/Game/Introduce";
import GameCard from "./screens/Game/GameCard";
import Point from "./screens/Game/Point";
<<<<<<< HEAD
import RewardedModal from "./components/modal/rewardedModal";
import OpenGiftModal from "./components/modal/openGiftModal";
=======
import Flipcard from "./screens/Game/Flipcard";
>>>>>>> 4a743d5edcafd403c06862c75e6c2caab1e4dca5

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="/intron" element={<Intron />} />
        <Route path="/game" element={<GameCard />} />
        <Route path="/point" element={<Point />} />
<<<<<<< HEAD
        <Route path="/rewardedModal" element={<RewardedModal />} />
        <Route path="/openGiftModal" element={<OpenGiftModal />} />
=======
        <Route path="/flipcard" element={<Flipcard />} />
>>>>>>> 4a743d5edcafd403c06862c75e6c2caab1e4dca5
      </Routes>
    </BrowserRouter>
  );
}

export default App;

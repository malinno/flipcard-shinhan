import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlayGame from "./screens/Game/PlayGame";
import Intron from "./screens/Game/Introduce";
import GameCard from "./screens/Game/GameCard";
import Point from "./screens/Game/Point";
import Flipcard from "./screens/Game/Flipcard";
import Loading from "./screens/Loading/Loading";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="/intron" element={<Intron />} />
        <Route path="/game" element={<GameCard />} />
        <Route path="/point" element={<Point />} />
        <Route path="/flipcard" element={<Flipcard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

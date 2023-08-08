import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./screens/Loading/Loading";
import PlayGame from "./screens/Game/PlayGame";
import Intron from "./screens/Game/Introduce";
import GameCard from "./screens/Game/GameCard";
import Point from "./screens/Game/Point";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/play" element={<PlayGame />} />
        <Route path="/intron" element={<Intron />} />
        <Route path="/game" element={<GameCard />} />
        <Route path="/point" element={<Point />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

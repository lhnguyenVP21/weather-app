import CurrentWeather from "./components/CurrentWeather/CurrenWeather";
import Header from "./components/Header/Header";
import "./index.css";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null); 
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e2d] to-[#1a1d42] text-white">
      <Header setWeather={setWeather} />
      <CurrentWeather weather={weather} />
    </div>


  );
}

export default App;

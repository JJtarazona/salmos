import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.jsx";
import "./App.css";
import Carta from "./Components/Carta.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Carta />
      </div>
    </>
  );
}

export default App;

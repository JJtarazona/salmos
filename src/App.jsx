import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Carta from "./Components/Carta";
import Favoritos from "./Components/Favoritos";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Carta />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

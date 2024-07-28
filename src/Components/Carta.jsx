import React, { useState, useEffect } from "react";
import { FaBible, FaHeart, FaRegHeart } from "react-icons/fa";
import { fondo } from "./data";
import { salmos } from "./data";
import salmoimg from "../../public/salmosimg2.svg";
import forma from "../../public/forma.svg";
import { useNavigate } from "react-router-dom";

export default function Carta() {
  const [dailyFondo, setDailyFondo] = useState(fondo[0].fondo);
  const [isFavorito, setIsFavorito] = useState(false);
  const navigate = useNavigate();
  const todayDate = new Date().toLocaleDateString();

  useEffect(() => {
    const today = new Date().getDate();
    const randomFondo = fondo[today % fondo.length].fondo;
    setDailyFondo(randomFondo);

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const todaySalmo = salmos[0];
    const isFav = favoritos.some((fav) => fav.titulo === todaySalmo.titulo);
    setIsFavorito(isFav);
  }, []);

  const handleFavoritoClick = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const todaySalmo = salmos[0];

    if (isFavorito) {
      const newFavoritos = favoritos.filter(
        (fav) => fav.titulo !== todaySalmo.titulo
      );
      localStorage.setItem("favoritos", JSON.stringify(newFavoritos));
    } else {
      favoritos.push(todaySalmo);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    setIsFavorito(!isFavorito);
  };

  const handleFavoritesClick = () => {
    navigate("/favoritos");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 font-body">Salmo del Día</h1>
      <div className="text-xl font-detalle font-semibold mb-2">{todayDate}</div>
      <div
        className={`relative max-w-2xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden ${dailyFondo}`}
      >
        <div className="absolute inset-0">
          <img
            src={forma}
            alt="Fondo"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative p-4 flex flex-col items-center justify-between">
          <div className="relative p-6 bg-white bg-opacity-70 shadow-lg rounded-3xl">
            <div className="relative flex items-center justify-center mb-4">
              <img src={salmoimg} alt="Salmo" className="w-24 h-24" />
            </div>
            <h1 className="text-5xl font-bold text-gray-700 font-body mb-4">
              {salmos[0].titulo}
            </h1>
            <p className="text-black font-bold text-pretty">
              {salmos[0].detalle}
            </p>
            <footer className="text-gray-600 text-sm"></footer>
            <button onClick={handleFavoritoClick} className="mt-4 text-red-500">
              {isFavorito ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <button
            onClick={handleFavoritesClick}
            className="fixed bottom-10 right-10 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white p-4 rounded-full shadow-lg hover:bg-white-600 transition duration-300"
          >
            <FaBible className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

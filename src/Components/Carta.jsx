import React, { useState, useEffect } from "react";
import { FaBible, FaHeart, FaRegHeart } from "react-icons/fa";
import { fondo } from "./data";
import { salmos } from "./data";
import salmoimg from "../../public/salmosimg2.svg";

import forma from "../../public/forma.svg";

export default function Carta() {
  const [dailyFondo, setDailyFondo] = useState(fondo[0].fondo);
  const [isFavorito, setIsFavorito] = useState(false);

  // Función para seleccionar un fondo aleatorio diario
  useEffect(() => {
    const today = new Date().getDate();
    const randomFondo = fondo[today % fondo.length].fondo;
    setDailyFondo(randomFondo);

    // Check if today's salmo is already in favorites
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const todaySalmo = salmos[0]; // Modify this if you want to change the daily salmo
    const isFav = favoritos.some((fav) => fav.titulo === todaySalmo.titulo);
    setIsFavorito(isFav);
  }, []);

  const handleFavoritoClick = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const todaySalmo = salmos[0]; // Modify this if you want to change the daily salmo

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

  return (
    <div
      className={`relative max-w-2xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden  ${dailyFondo}`}
    >
      {/* Imagen de fondo con opacidad */}
      <div className="absolute inset-0">
        <img
          src={forma}
          alt="Fondo"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative flex items-center justify-center">
        <img src={salmoimg} alt="" />
      </div>
      <div className="relative p-6">
        <h1 className="text-5xl font-bold font-body mb-4">
          {salmos[0].titulo}
        </h1>
        <p className="text-gray-700 mb-4 ">{salmos[0].detalle}</p>
        <footer className="text-gray-600 text-sm"></footer>
        <button onClick={handleFavoritoClick} className="mt-4 text-red-500">
          {isFavorito ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}

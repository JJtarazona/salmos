import React, { useState, useEffect } from "react";
import { FaBible, FaHeart, FaRegHeart } from "react-icons/fa";
import { fondo } from "./data";
import { salmos } from "./data";

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
      className={`max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 ${dailyFondo} h-90vh`}
      style={{ height: "90vh" }}
    >
      <div className="flex items-center justify-center p-4">
        <FaBible className="text-white text-4xl" />
      </div>
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold mb-4">{salmos[0].titulo}</h1>
          <p className="text-gray-700 mb-4">{salmos[0].detalle}</p>
        </div>
        <footer className="text-gray-600 text-sm mt-auto">
          <p>Palabra del Señor</p>
          <button onClick={handleFavoritoClick} className="mt-4 text-red-500">
            {isFavorito ? <FaHeart /> : <FaRegHeart />}
          </button>
        </footer>
      </div>
    </div>
  );
}

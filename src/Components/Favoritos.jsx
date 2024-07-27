import React, { useState, useEffect } from "react";
import { FaBible } from "react-icons/fa";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Salmos Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-gray-700">No hay salmos favoritos guardados.</p>
      ) : (
        favoritos.map((salmo, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden mb-6"
          >
            <div className="flex items-center justify-center bg-red-500 p-4">
              <FaBible className="text-white text-4xl" />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">{salmo.titulo}</h1>
              <p className="text-gray-700 mb-4">{salmo.detalle}</p>
              <footer className="text-gray-600 text-sm">
                <p>Palabra del Señor</p>
              </footer>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

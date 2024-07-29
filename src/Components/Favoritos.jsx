import React, { useState, useEffect } from "react";
import { FaTrash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fondo } from "./data";
import forma from "../../public/forma.svg";
import salmoimg from "../../public/salmosimg2.svg";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(savedFavoritos);
  }, []);

  const handleRemoveFavorito = (titulo) => {
    const newFavoritos = favoritos.filter((fav) => fav.titulo !== titulo);
    localStorage.setItem("favoritos", JSON.stringify(newFavoritos));
    setFavoritos(newFavoritos);
  };

  const handleHomeClick = () => {
    navigate("/"); // Ruta al home
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-body">
        Mis Salmos Favoritos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoritos.length === 0 ? (
          <p>No tienes salmos favoritos aún.</p>
        ) : (
          favoritos.map((salmo) => (
            <div
              key={salmo.titulo}
              className={`relative bg-white shadow-lg rounded-3xl overflow-hidden ${fondo[0].fondo}`}
            >
              <div className="absolute inset-0">
                <img
                  src={forma}
                  alt="Fondo"
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
              <div className="relative p-4 flex flex-col items-center justify-between">
                <div className="relative p-6 bg-white bg-opacity-70 shadow-lg rounded-3xl w-full">
                  <div className="relative flex items-center justify-center mb-4">
                    <img src={salmoimg} alt="Salmo" className="w-24 h-24" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-700 font-body mb-4 text-center">
                    {salmo.titulo}
                  </h2>
                  <p className="text-black font-bold text-pretty text-center mb-4">
                    {salmo.detalle}
                  </p>
                  <button
                    onClick={() => handleRemoveFavorito(salmo.titulo)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botón flotante para volver al home */}
      <button
        onClick={handleHomeClick}
        className="fixed bottom-10 right-10 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white p-4 rounded-full shadow-lg hover:bg-white-600 transition duration-300"
      >
        <FaHome className="text-2xl" />
      </button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { FaTrash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import { fondo } from "./data"; // Asegúrate de tener estos datos importados correctamente
import forma from "../../public/forma.svg"; // Imagen de fondo similar a la de Carta
import salmoimg from "../../public/salmosimg2.svg";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate(); // Hook para navegación

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
      <div
        className={`relative max-w-2xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden ${fondo[0].fondo}`}
      >
        {/* Imagen de fondo con opacidad */}

        <div className="absolute inset-0">
          <img
            src={forma}
            alt="Fondo"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative mt-1 p-4">
          {favoritos.length === 0 ? (
            <p>No tienes salmos favoritos aún.</p>
          ) : (
            favoritos.map((salmo) => (
              <div
                key={salmo.titulo}
                className="bg-white opacity-70 shadow-lg rounded-3xl p-4 flex flex-col items-center justify-between"
              >
                <div>
                  {" "}
                  <img src={salmoimg} alt="" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold font-body text-black mb-2">
                    {salmo.titulo}
                  </h2>
                  <p className="text-black font-bold text-pretty">
                    {salmo.detalle}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <footer className="text-gray-600 text-sm">
                    {" "}
                    <button
                      onClick={() => handleRemoveFavorito(salmo.titulo)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </footer>
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
    </div>
  );
}

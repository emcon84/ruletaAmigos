'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export const Rulet: React.FC = () => {
  const nombres: string[] = [
    'Emiliano',
    'Willy',
    'Romulo',
    'Pachila',
    'Pivi',
    'Zamar',
    'CabeRock',
    'Napoleon',
  ];
  const comidas: string[] = ['Pizza', 'Asado', 'Pastas', 'Pafrita y milanga', 'Comodin'];

  const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
  const [comidaSeleccionada, setComidaSeleccionada] = useState<string | null>(null);
  const [ruletaNombre, setRuletaNombre] = useState<string>('');
  const [ruletaComida, setRuletaComida] = useState<string>('');

  // Definir los tipos de los parámetros
  const sortear = (
    lista: string[],
    setRuleta: React.Dispatch<React.SetStateAction<string>>,
    setResultado: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    let interval: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    const spin = () => {
      currentIndex = (currentIndex + 1) % lista.length;
      setRuleta(lista[currentIndex]);
    };

    interval = setInterval(spin, 100);

    setTimeout(() => {
      if (interval) clearInterval(interval);
      const seleccionado = lista[Math.floor(Math.random() * lista.length)];
      setRuleta(seleccionado);
      setResultado(seleccionado);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Image src={'/logo.png'} alt="Logo" width={800} height={200} />

      {/* Ruleta de Nombres */}
      <div className="shadow-md rounded-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">¿A quién le toca?</h2>
        <div className="h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-bold">
          {ruletaNombre || 'Gira la ruleta...'}
        </div>
        <button
          onClick={() => sortear(nombres, setRuletaNombre, setNombreSeleccionado)}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Sortear Nombre
        </button>
        {nombreSeleccionado && (
          <p className="mt-2 text-gray-300 font-semibold">
            ¡Le toca a {nombreSeleccionado} agasajar!
          </p>
        )}
      </div>

      {/* Ruleta de Comidas */}
      <div className="shadow-md rounded-lg p-6 mt-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">¿Qué comemos?</h2>
        <div className="h-16 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-lg text-lg font-bold">
          {ruletaComida || 'Gira la ruleta...'}
        </div>
        <button
          onClick={() => sortear(comidas, setRuletaComida, setComidaSeleccionada)}
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Sortear Comida
        </button>
        {comidaSeleccionada && (
          <p className="mt-2 text-gray-300 font-semibold">
            ¡El plato será {comidaSeleccionada}!
          </p>
        )}
      </div>
    </div>
  );
};

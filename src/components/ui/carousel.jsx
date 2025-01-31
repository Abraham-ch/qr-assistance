import { useState, useEffect, useCallback } from 'react';

import estudiante01 from "assets/img/acc01.jpg"
import estudiante02 from "assets/img/acc02.jpg"
import estudiante03 from "assets/img/acc03.jpg"
import estudiante04 from "assets/img/acc04.jpg"
import estudiante05 from "assets/img/acc05.jpg"
import estudiante06 from "assets/img/acc06.jpg"

import chevronright from "assets/svg/chevron-right.svg"

const Carousel = () => {

  const students = [
    { id: 1, name: "Juan Pérez", img: estudiante01 },
    { id: 2, name: "María López", img: estudiante02 },
    { id: 3, name: "Carlos Ramírez", img: estudiante03 },
    { id: 4, name: "Ana Torres", img: estudiante04 },
    { id: 5, name: "Luis Gómez", img: estudiante05 },
    { id: 6, name: "Sofía Rodríguez", img: estudiante06 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const totalItems = students.length;

  // Create a circular array for smooth infinite scroll
  const getVisibleItems = useCallback(() => {
    let items = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push(students[index]);
    }
    return items;
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold pb-4">
        Nuestros Campeones
      </h2>
      <p className="text-center mb-6">
        Orgullosos de sus logros y motivando a los futuros estudiantes.
      </p>
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md z-10 transition-colors"
        >
          <img 
            src={chevronright} 
            className="rotate-180 w-6 h-6" 
            alt="deslizar a la izquierda" 
          />
        </button>
        <div className="flex gap-6 overflow-hidden w-full justify-center px-12">
          {getVisibleItems().map((student, index) => (
            <div
              key={`${student.id}-${index}`}
              className="transform transition-transform duration-500 ease-in-out w-1/3 min-w-[150px]"
            >
              <img
                src={student.img}
                alt={`Foto de ${student.name}`}
                className="rounded-lg shadow-md w-full object-cover h-auto aspect-square"
              />
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md z-10 transition-colors"
        >
          <img 
            src={chevronright} 
            className="w-6 h-6" 
            alt="deslizar a la derecha" 
          />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
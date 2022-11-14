import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import s from './CarritoCard.module.css'


const CarritoCard = ({ name, image, rom, price, id, update, setUpdate }) => {


  function deletedCarrito() {
    localStorage.removeItem(id)
    setUpdate(!update)
  }

  return (
    <>
      <div className={s.containerCrad}>
        <button className={s.buttonCarrito} onClick={() => deletedCarrito()} > X </button>
        <div className="group relative">
          <div className="min-h-[20%] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:aspect-none lg:h-60">
            <img
              src={image}
              alt="Phone_image"
              className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{rom}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarritoCard;

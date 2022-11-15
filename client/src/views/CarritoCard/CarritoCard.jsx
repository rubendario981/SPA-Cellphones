import React from "react";
import { Link } from "react-router-dom";
import s from './CarritoCard.module.css'


const CarritoCard = ({ name, image, rom, price, id, update, setUpdate, stock }) => {

  let product = Object.entries(localStorage).map(e => JSON.parse(e[1])).find(e => e.name === name)

  function deletedCarrito() {
    let confirm = window.confirm(`Esta seguro que desea eliminar ${name} x ${product.cant}?`)
    if (confirm) {
      localStorage.removeItem(id)
      setUpdate(!update)
    }
  }

  function onHandelChange(e) {
    product.cant = e.target.value * 1
    localStorage.setItem(id, JSON.stringify(product))
    setUpdate(!update)
  }


  return (
    <>
      <div className={s.containerCrad}>
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
        <div className="flex flex-col">
          <input className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-20 justify-self-auto" type="number" onChange={(e) => onHandelChange(e)} min={1} max={stock} defaultValue={product.cant} />
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => deletedCarrito()} > Eliminar del carrito </button>
          <label className="inline-block" htmlFor="Stcok"> Disponibles: {stock}</label>
        </div>
      </div>
    </>
  );
};

export default CarritoCard;

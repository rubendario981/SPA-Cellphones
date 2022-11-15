import React from "react";
import { useState } from "react";
import CarritoCard from "../CarritoCard/CarritoCard.jsx";

export default function Carrito() {

  const [update, setUpdate] = useState(false)

  function handelClear() {
    localStorage.clear()
    setUpdate(!update)
  }
  // localStorage.clear()

  function handelBuy() {
    setUpdate(!update)
    localStorage.clear()
    alert("Carrito comprado con exito")
  }

  let total = Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => 1 * e.price.replace("$", "") * e.cant)

  total = total.length > 1 ? total.reduce((a, b) => a + b, 0) : total

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-4">
        Carrito de compras
      </h1>
      <hr className="p-2" />
      <div className="p-5 flex justify-center flex-wrap gap-10">
        {Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => <CarritoCard update={update} setUpdate={setUpdate} image={e.image} rom={e.rom} price={e.price} id={e.id} name={e.name} key={e.id} stock={e.stock} />)}
      </div>
      <div>
        <div className="flex justify-center">
          <h1 className="pb-2">{`Total del carrito: ${total}`}</h1>
        </div>
        <hr className="p-2" />
        <div className="flex justify-center gap-10">
          <button onClick={() => handelClear()} className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Vaciar carrito
          </button>
          <button onClick={() => handelBuy()} className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Comprar carrito
          </button>
        </div>
      </div>
    </>
  )
}
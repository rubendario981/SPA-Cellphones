import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import CarritoCard from "../CarritoCard/CarritoCard.jsx";
import s from './Carrito.module.css'

export default function Carrito() {

  const [update, setUpdate] = useState(false)

  function handelClear() {
    localStorage.clear()
    setUpdate(!update)
  }
  // localStorage.clear()

  let total = Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => 1 * e.price.replace("$", "") * e.cant)

  total = total.length > 1 ? total.reduce((a, b) => a + b, 0) : total

  return (
    <>
      <div className={s.containerFavs}>
        {Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => <CarritoCard update={update} setUpdate={setUpdate} image={e.image} rom={e.rom} price={e.price} id={e.id} name={e.name} key={e.id} stock={e.stock} />)}
      </div>
      <h1>{`Total del carrito: ${total}`}</h1>
      <button onClick={() => handelClear()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Vaciar carrito
      </button>
    </>
  )
}
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

  let total = Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => e.price.replace("$", "") * e.cant)
  console.log(Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => e.cant));

  return (
    <>
      <div className={s.containerFavs}>
        {Object.entries(localStorage).map(e => JSON.parse(e[1])).map(e => <CarritoCard update={update} setUpdate={setUpdate} image={e.image} rom={e.rom} price={e.price} id={e.id} />)}
      </div>
      <h1>{`Total del carrito: ${total}`}</h1>
      <button onClick={() => handelClear()}> Vaciar carrito </button>
    </>
  )
}
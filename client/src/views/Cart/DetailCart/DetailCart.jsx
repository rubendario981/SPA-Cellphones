import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DetailCart() {

  let navigate = useNavigate()
  let storage = JSON.parse(localStorage.getItem("products"))
  const [update, setUpdate] = useState(false)
  let elementsCart = JSON.parse(localStorage.getItem("products"))

  //cambiar
  function deletedProduct(id) {
    let elementsCart = JSON.parse(localStorage.getItem("products"))
    let index = elementsCart.findIndex(e => e.id === id)
    elementsCart.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(elementsCart))
    setUpdate(!update)
  }

  return (
    <div className=" mb-60">
      <div className="flex flex-col w-full px-5 pb-5">
        <div className="flex flex-col w-full justify-center rounded-3xl items-start border border-blue-500/20 bg-stone-300/40">
          <div className="flex flex-col justify-center w-full">
            {storage?.map(e =>
            (
              <div className="h-30 mx-4 mb-2 bg-white border rounded-xl" key={e.id}>
                <div className="flex h-20 flex-row">
                  <div className="flex">
                    <Link to={`/product/${e.id}`} className='w-9 object-contain'>
                      <img src={`${e.image}`} />
                    </Link>
                  </div>
                  <div className="w-full">
                    <h1 className="pl-4 pt-1 text-xl">{e.name}</h1>
                  </div>
                  <div className="flex w-full justify-end pt-2 pr-2 text-xl font-bold">
                    <h1>$ {e.price}</h1>
                  </div>
                </div>
                <hr />
                <div className="flex w-full justify-around">
                  <button className="text-cyan-500" onClick={() => deletedProduct(e.id)}> Eliminar </button>
                  <button className="text-cyan-500" onClick={() => navigate(`/product/${e.id}`)}> Detalles </button>
                </div>
                <hr />
              </div>
            ))
            }
          </div>
          <div className="flex w-full flex-row-reverse">
            <button onClick={() => navigate("/envio")} className="bg-transparent bg-green-500 text-white font-semibold hover:text-white py-2 px-2 mr-4 mb-4 border border-blue-500 hover:border-transparent rounded " disabled={elementsCart.length ? false : true}>
              Continuar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
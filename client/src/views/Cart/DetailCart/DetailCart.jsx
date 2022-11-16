import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DetailCart() {

  let navigate = useNavigate()
  let storage = Object.entries(localStorage).map(e => JSON.parse(e[1]))
  const [update, setUpdate] = useState(false)

  function deletedProduct(id) {
    localStorage.removeItem(id)
    setUpdate(!update)
  }

  return (
    <div className="h-screen">
      <div className="flex w-full h-full pl-5 mr-20 pt-20 pb-5">
        <div className="flex w-full mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300">
          <div className="flex flex-col justify-center w-full m-5">
            {storage.map(e =>
            (
              <div className="h-30 mb-2 bg-white border rounded-xl">
                <div className="flex h-20 flex-row">
                  <div className="flex">
                    <Link to={`/product/${e.id}`} className='w-10 object-contain'>
                      <img src={`${e.image}`} />
                    </Link>
                  </div>
                  <div className="w-full">
                    <h1 className="pl-4 pt-1 text-xl">{e.name}</h1>
                  </div>
                  <div className="flex w-full justify-end pt-2 pr-2 text-xl font-bold">
                    <h1>$ {e.price.replace("$", "")}</h1>
                  </div>
                </div>
                <div className="flex w-2/4 justify-around">
                  <button className="text-cyan-500" onClick={() => deletedProduct(e.id)}> Eliminar </button>
                  <button className="text-cyan-500" onClick={() => navigate(`/product/${e.id}`)}> Detalles </button>
                </div>
                <hr />
              </div>
            ))
            }
          </div>
        </div>
      </div>
      <div className="flex bg-red-500 w-full">
        <button onClick={() => navigate("/envio")}> Continuar compra</button>
      </div>
    </div>
  )
}
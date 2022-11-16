import React from "react";


export default function Envio() {
  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col w-full h-full pl-5 mr-20 pb-5">
          <div className="flex flex-col w-full mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300">
            <h1 className="p-5 ">Envio</h1>
            <div className="flex flex-col justify-center w-full py-4">
            </div>
            <div className="flex w-full flex-row-reverse">
              <button className="bg-transparent bg-green-500 text-white font-semibold hover:text-white py-2 px-2 mr-4 mb-4 border border-blue-500 hover:border-transparent rounded ">
                Continuar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
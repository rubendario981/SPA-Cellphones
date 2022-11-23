import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { udapteUser } from "../../../redux/actions";

export default function FormAddress({ update, setUpdate, setBoolean, boolean }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(s => s.user)
  let user = userInfo?.data

  function handleEditUser(e) {
    user[e.target.name] = e.target.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(udapteUser(user))
    setUpdate(!update)
  }

  return (
    <>
      <div className="flex flex-col w-full h-screen mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300/40 border border-blue-500/20">
        <form className="flex m-auto flex-col" onSubmit={(e) => handleSubmit(e)}>
          <h1>Debe ingresar una direccion para el envio de su pedido.</h1>
          <label htmlFor="pais" >Pais</label>
          <input name={"country"} type="text" defaultValue={user?.country} onChange={(e) => handleEditUser(e)} />
          <label htmlFor="ciudad">Ciudad</label>
          <input name={"city"} type="text" defaultValue={user?.city} onChange={(e) => handleEditUser(e)} />
          <label htmlFor="direccion">Direccion</label>
          <input name={"address"} type="text" defaultValue={user?.address} onChange={(e) => handleEditUser(e)} />
          <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded" type="submit">
            Agregar direccion
          </button>
        </form>
      </div>
    </>
  )
}
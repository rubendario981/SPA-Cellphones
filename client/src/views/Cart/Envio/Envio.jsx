import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../redux/actions";
import LoginForm from "../../Home/Login/LoginForm";



export default function Envio() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userInfo = useSelector(s => s.user)
  let user = userInfo?.data
  const [checkbox, setCheckbox] = useState("")

  useEffect(() => {
    if (token) {
      const user = JSON.parse(window.atob(token?.split('.')[1]))
      dispatch(getProfile(user.id))
    }
  }, [dispatch])

  function handleChangeCheckbox(e) {
    if (checkbox === e.target.name) return setCheckbox("")
    setCheckbox(e.target.name)
    localStorage.setItem("envio", e.target.name)
  }

  return (
    <>
      {/* Registrado? */}
      {token
        ?
        // Si
        <>
          <div className="h-screen">
            <div className="flex flex-col w-full h-full pl-5 mr-20 pb-5">
              <div className="flex flex-col w-full mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300">
                {/* Con direccion? */}
                {user?.address
                  ?
                  // si
                  <>
                    <div className="w-full">
                      <div className="flex flex-col w-full h-20 my-10 pl-5">
                        <h1 className="text-xl font-bold">Retiro en la sucursal</h1>
                        <p>Pueyrredon al 1567,<br />de 9hs a 18hs,<br />Lunes a Viernes</p>
                        <div className="flex w-full justify-end">
                          <input className="mr-10 w-5 h-5" type="checkbox" name="sucursal" onChange={(e) => handleChangeCheckbox(e)} checked={checkbox === "sucursal" ? true : false} />
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-20 mb-10 pl-5" >
                        <h1 className="text-xl font-bold">Envio a domicilio</h1>
                        <p>{user?.country},</p>
                        <p>{user?.city},</p>
                        <p>{user?.address}.</p>
                        <div className="flex w-full justify-end">
                          <input className="mr-10 w-5 h-5" type="checkbox" name="domicilio" onChange={(e) => handleChangeCheckbox(e)} checked={checkbox === "domicilio" ? true : false} />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-row-reverse mt-5">
                      <button className="bg-transparent bg-green-500 text-white font-semibold hover:text-white py-2 px-2 mr-4 mb-4 border border-blue-500 hover:border-transparent rounded ">
                        Continuar compra
                      </button>
                    </div>
                  </>
                  :
                  // No
                  <>
                    <div className="w-full pl-10">
                      <div className="flex flex-col w-full h-20 my-10">
                        <h1 className="text-xl font-bold">Retiro en la sucursal</h1>
                        <p>Pueyrredon al 1567,<br />de 9hs a 18hs,<br />Lunes a Viernes</p>
                        <div className="flex w-full justify-end">
                          <input className="mr-10 w-5 h-5" type="checkbox" name="sucursal" onChange={(e) => handleChangeCheckbox(e)} checked={checkbox === "sucursal" ? true : false} />
                        </div>
                      </div>
                      <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded" onClick={() => navigate("/user/createAddress")}>
                        Agregar una ubicaion para el envio
                      </button>
                      <div className="flex w-full flex-row-reverse mt-5">
                        <button className="bg-transparent bg-green-500 text-white font-semibold hover:text-white py-2 px-2 mr-4 mb-4 border border-blue-500 hover:border-transparent rounded ">
                          Continuar compra
                        </button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </>
        : <>
          <LoginForm />
        </>
      }
    </>
  )
} 
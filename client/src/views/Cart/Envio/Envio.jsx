import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/actions";
import LoginForm from "../../Home/Login/LoginForm";



export default function Envio() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userInfo = useSelector(s => s.user)
  const user = userInfo?.data


  // (function () {
  //   if (token) {
  //     const user = JSON.parse(window.atob(token?.split('.')[1]))
  //     console.log(user.id);
  //     dispatch(getProfile(user.id))
  //   }
  // })()



  useEffect(() => {
    if (token) {
      const user = JSON.parse(window.atob(token?.split('.')[1]))
      console.log(user.id);
      dispatch(getProfile(user.id))
    }
  }, [dispatch])

  return (
    <>
      {token
        ?
        <>
          <div className="h-screen">
            <div className="flex flex-col w-full h-full pl-5 mr-20 pb-5">
              <div className="flex flex-col w-full mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300">
                <h1 className="p-5 ">{user?.name}</h1>
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
        :
        <>
          <LoginForm />
        </>
      }
    </>
  )
} 
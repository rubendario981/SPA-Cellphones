import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assests/LOGO.png";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
  let user = {}
  if (!token) {
    localStorage.setItem('token', '')
  } else {
    // decodifico el token y lo guardo en un objeto
    user = JSON.parse(window.atob(token?.split('.')[1]))
  }
  
  useEffect(() => {
  }, [pathname, user]);
  
  const cerrarSesion = () => {
    const response = window.confirm("Estas seguro que quieres cerrar la sesion?")
    if (response) {
      localStorage.removeItem('token')
      navigate('/')
    }
  }

  return (
    <div className="text-xs flex mb-2 px-6 bg-gradient-to-t from-blue-200 to-sky-600 justify-between sticky top-0 w-screen z-10">
      <Link to={"/"} >
        <img src={logo} width={"100px"} alt="Logo" />
      </Link>

      <div className="flex">
        {!user && pathname === "/login" && (
          <Link
            className=" px-2 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"register"}
          >
            Registrar
          </Link>
        )}
        {!user.id && pathname === "/register" && (
          <Link
            className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"login"}
          >
            Login
          </Link>
        )}
        {!user.id && pathname === "/" && (
          <>
            <Link
              className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
              to={"register"}
            >
              Registrar
            </Link>
            <Link
              className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
              to={"login"}
            >
              Login
            </Link>
          </>
        )}
        {user.id && (
          <>
            <Link
              className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
              to={"perfil"}
            >
              Ver perfil
            </Link>

            <button
              className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
              onClick={cerrarSesion}
            >
              Cerrar sesion
            </button>
          </>
        )}

        {user.status === "Admin" &&
          <Link
            className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"create"}
          >
            Crear producto
          </Link>
        }
        <Link
          className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
          to={"carrito"}
        >
          Carrito
        </Link>
      </div>
    </div>
  );
};

export default Header;

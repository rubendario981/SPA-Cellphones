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
    <div className="text-xs flex mb-2 px-6 bg-gradient-to-t from-blue-200 to-sky-600 justify-between sticky top-0 z-10">
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
            to={"dashboardAdmin"}
          >
            Panel Administrativo
          </Link>
        }
        <Link
          className="px-4 py-2"
          to={"carrito"}
        >

          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            Buy now
          </button>

        </Link>
      </div>
    </div>
  );
};

export default Header;

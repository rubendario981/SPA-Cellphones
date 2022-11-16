import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assests/LOGO.png";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => { }, [pathname]);

  return (
    <div className="text-xs flex mb-2 px-6 bg-gradient-to-t from-blue-200 to-sky-600 justify-between sticky top-0 w-screen z-10">
      <Link to={"/"} >
        <img src={logo} width={"100px"} alt="Logo" />
      </Link>

      <div className="flex">
        {pathname === "/login" && (
          <Link
            className=" px-2 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"register"}
          >
            Registrar
          </Link>
        )}

        {pathname === "/register" && (
          <Link
            className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"login"}
          >
            Login
          </Link>
        )}

        {pathname === "/" && (
          <>
            <Link
              className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
              to={"carrito"}
            >
              Carrito
            </Link>
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


        {/* Solamente para administrador */}
        <Link
          className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
          to={"create"}
        >
          Crear producto
        </Link>


      </div>
    </div>
  );
};

export default Header;

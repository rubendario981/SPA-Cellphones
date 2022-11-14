import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assests/LOGO.png";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => { }, [pathname]);

  return (
    <div className="text-xs flex mb-2 px-6 bg-gradient-to-t from-blue-200 to-sky-600 justify-between">
      <div className="w-2/5 cursor-pointer" onClick={() => navigate("/home")}>
        <img src={logo} width={"100px"} alt="Logo" />
      </div>
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
        <Link
          className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
          to={"create"}
        >
          Crear producto
        </Link>

        {pathname === "/home" && (
          <Link
            className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
            to={"carrito"}
          >
            Carrito
          </Link>

        )}
      </div>
    </div>
  );
};

export default Header;

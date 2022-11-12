import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {}, [pathname]);

  return (
    <div className="flex py-12 px-6 bg-gradient-to-t from-blue-200 to-sky-600 justify-between">
      <div className="w-2/5 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-7XClzEGJQV62I4bKz3Jf3LqQ2dmG_oC_zA&usqp=CAU"
          width={"200px"}
          alt="Logo"
        />
        <p>Fijar logo</p>
      </div>
      <div className="flex">
        {pathname === "/login" && (
          <Link
            className="px-4 py-2 my-auto rounded-2xl mr-6 bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
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
      </div>
    </div>
  );
};

export default Header;

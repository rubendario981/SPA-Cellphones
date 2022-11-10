import "./App.css";
import React, { useEffect } from "react";
import Home from "./views/Home/Products/Products";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import { Route, Routes } from "react-router-dom";
import Products from "./views/Home/Products/Products";
import ProductCard from "./views/Home/ProductCard/ProductCard";
import Header from "./views/Home/Header/Header";
import Detail from "./views/Detail/Detail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Routes>
        <Route exact path={"/"} element={<Header />} />
        <Route exact path={"/home"} element={<Home />} />
        {/* <Route path={"productos"} element={Products}/>  /}
        <Route path={"/detalleProducto/:id"} element={Detail}/>
        <Route path={"/filters"} element={Header}/>
        {/ <Route path={"/createProduct"}/> */}
      </Routes>
    </React.Fragment>
  );
}

import "./App.css";
import React, { useEffect } from "react";
import Home from "./views/Home/Products/Products";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import { Route, Routes } from "react-router-dom";
import Products from "./views/Home/Products/Products";
import ProductCard from "./views/Home/ProductCard/ProductCard";
import Header from "./views/Home/Header/Header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Routes>
        <Route exact path={"/"} element={<Header />} />
        <Route exact path={"/home"} component={<Home />} />
        <Route path={"productos"} component={Products}/>
        <Route path={"detalleProducto/:id"} component={ProductCard}/>
        <Route path={"filters"} component={Header}/>
        <Route path={"createProduct"}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;

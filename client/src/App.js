import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import { Route, Routes } from "react-router-dom";

import Products from "./views/Home/Products/Products";
import FormProduct from "./views/FormProduct/FormProduct";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Routes>
        <Route exact path={"/"} element={<Products />} />
        <Route exact path={"/create"} element={<FormProduct />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

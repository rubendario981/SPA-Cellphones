import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import { Route, Routes } from "react-router-dom";
import Products from "./views/Home/Products/Products";
import Detail from "./views/Detail/DetailPhones";
import FormProduct from "./views/FormProduct/FormProduct"
import FormUser from "./views/FormUser/FormUser";
import LoginForm from "./views/Home/Login/LoginForm"
import Header from "./views/Home/Header/Header";
import Footer from "./views/Home/Footer/Footer";


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Products />} />
        <Route exact path={"/product/:id"} element={<Detail />} />
        {/* <Route exact path='/product/:id' render={({ match }) => <Detail id={match.params.id} />} /> */}
        <Route exact path={"/create"} element={<FormProduct />} />
        <Route exact path={"/register"} element={<FormUser />} />
        <Route exact path={"/login"} element={<LoginForm />} />
      </Routes>
      <Footer/>
    </React.Fragment>
  );
}

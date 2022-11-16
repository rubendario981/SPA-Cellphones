import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, getListBrands, getListOs } from './redux/actions';
import { Route, Routes } from 'react-router-dom';
import Products from './views/Home/Products/Products';
import Detail from './views/Detail/DetailPhones';
import FormProduct from './views/FormProduct/FormProduct';
import FormUser from './views/FormUser/FormUser';
import LoginForm from './views/Home/Login/LoginForm';
import Header from './views/Home/Header/Header';
import Footer from './views/Home/Footer/Footer';
import Carrito from './views/Carrito/Carrito';
// import Landing from './views/Landing/Landing';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getListBrands());
    dispatch(getListOs());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        {/* <Route exact path={'/'} element={<Landing />} /> */}
        <Route exact path={'/home'} element={<Products />} />
        <Route exact path={'/product/:id'} element={<Detail />} />

        <Route exact path={'/'} element={<Products />} />
        <Route exact path={'/product/:id'} element={<Detail />} />

        {/* <Route exact path='/product/:id' render={({ match }) => <Detail id={match.params.id} />} /> */}
        <Route exact path={'/create'} element={<FormProduct />} />
        <Route exact path={'/register'} element={<FormUser />} />
        <Route exact path={'/login'} element={<LoginForm />} />
        <Route exact path={'/carrito'} element={<Carrito />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

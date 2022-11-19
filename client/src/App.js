import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, getListBrands, getListOs } from './redux/actions';
import { Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Products from './views/Home/Products/Products';
import Detail from './views/Detail/DetailPhones';
import FormProduct from './views/FormProduct/FormProduct';
import FormUser from './views/FormUser/FormUser';
import LoginForm from './views/Home/Login/LoginForm';
import Header from './views/Home/Header/Header';
import Footer from './views/Home/Footer/Footer';
import Carrito from './views/Cart/Carrito/Carrito';
import DetailCart from './views/Cart/DetailCart/DetailCart';
import Perfil from './views/Perfil/Perfil';
import Envio from './views/Cart/Envio/Envio';
import Pago from './views/Cart/Pago/Pago';

const stripePromise = loadStripe(
  'pk_test_51M5u48DvLT9vn19qkH7KeTd6Ll4wZAhyGYTlYTLGsF2TVIUfRpl925HNDce6TS8kd4y3Exbei8G6W3NKhKqDmtIH00v4L6YcrT'
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getListBrands());
    dispatch(getListOs());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Elements stripe={stripePromise}>
        <Header />
        <Routes>
          {/* Productos */}
          <Route exact path={'/'} element={<Products />} />
          <Route exact path={'/product/:id'} element={<Detail />} />
          <Route exact path={'/create'} element={<FormProduct />} />
          {/* Carrito */}
          <Route exact path={'/carrito'} element={<Carrito />} />
          <Route exact path={'/detailCart'} element={<DetailCart />} />
          <Route exact path={'/envio'} element={<Envio />} />
          <Route exact path={'/pago'} element={<Pago />} />
          {/* Usuario */}
          <Route exact path={'/register'} element={<FormUser />} />
          <Route exact path={'/login'} element={<LoginForm />} />
          <Route exact path={'/perfil'} element={<Perfil />} />
        </Routes>
        <Footer />
      </Elements>
    </React.Fragment>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail } from '../../redux/actions/index'
import { useEffect } from "react";
import { getProductById } from "../../redux/actions/index";
import { useParams } from "react-router-dom";


export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const phones = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(getProductById(id))
  }, [dispatch])

  useEffect(() => {
    return function () {
      dispatch(cleanDetail())
    }
  }, [dispatch])

  return (
    <div>
      <div><button><Link to='/home'>Volver</Link></button></div>
      {/* <h2>Detail</h2> */}
      {phones.length > 0 ?

        <div >
          <div >
            <h1 >{phones.map(e => e.name)}</h1>

          </div>
          <br />
          <div  >
            <img src={phones.map(e => e.image)} alt="phone img" />
          </div>
          <div><h2>Ficha Tecnica</h2></div>
          <div >
            <h4>Marca: {phones.map(e => e.brand.name)}</h4>
            <h4>Camara Trasera: {phones.map(e => e.rear_camera)}</h4>
            <h4>Camara frontal: {phones.map(e => e.front_camera)}</h4>
            <h4>RAM: {phones.map(e => e.ram)}</h4>
            <h4>Memoria interna: {phones.map(e => e.internal_storage)}</h4>
            <h4>Bateria: {phones.map(e => e.battery)}</h4>
            <h4>Sistema Opertivo: {phones.map(e => e.o.name)} </h4>
            <h4>Pantalla: {phones.map(e => e.screen)} </h4>
            <h3>Precio: {phones.map(e => e.price)}</h3>
          </div>
          <div><button><Link to='/home'> Arreglar para añadir al carrito </Link></button></div>

        </div> : (
          <div >
            <img src='https://tenor.com/es/ver/loading-thinking-shiba-inu-gif-25291442' alt="logoload" />
          </div>)}






    </div>


  )



}
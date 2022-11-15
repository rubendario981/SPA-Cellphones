import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail } from '../../redux/actions/index'
import { useEffect } from "react";
import { getProductById } from "../../redux/actions/index";


export default function Detail(id) {
  const dispatch = useDispatch();

  const phones = useSelector(state => state.products)

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
      {
        phones.length > 0 ?
          <div >
            <div >
              <h1 >{phones.map(e => e.name)}</h1>
            </div>
            <br />
            <div  >
              <img src={phones.map(e => e.image)} alt="logoimg" />
            </div>
            <div><h2>Ficha Tecnica</h2></div>
            <div >
              <h4>Marca:{phones.map(e => e.brand)}</h4>
              <h4>Camara Trasera:{phones.map(e => e.rear_camera)}</h4>
              <h4>Camara frontal:{phones.map(e => e.font_camera)}</h4>
              <h4>RAM:{phones.map(e => e.ram)}</h4>
              <h4>Memoria interna:{phones.map(e => e.rom)}</h4>
              <h4>Bateria:{phones.map(e => e.battery)}</h4>
              <h4>Sistema Opertivo: {phones.map(e => e.SO)} </h4>
              <h4>Pantalla: {phones.map(e => e.screen)} </h4>
              <h3>Precio: {phones.map(e => e.price)}</h3>
            </div>
            <div>
              <div><button><Link to='/home'>Comprar!</Link></button></div>
            </div>
          </div> : (
            <div >
              <img src='https://tenor.com/es/ver/loading-thinking-shiba-inu-gif-25291442' alt="logoload" />
            </div>)}
    </div>
  )
}
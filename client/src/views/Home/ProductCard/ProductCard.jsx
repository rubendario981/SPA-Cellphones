import React from "react";
import { Link } from "react-router-dom";
import s from './ProductCard.module.css'


// const ProductCard = ({ id, name, image, price, screen, internal_storage, ram, front_camera, rear_camera, cpu, battery, color, description, stock, oId, brandId, setDataModal }) => {
const ProductCard = (props) => {
  
  const addCarrito = (prod) => {
    const value = localStorage.getItem('products')
    if (!value) {
      const arrayProd = []
      arrayProd.push(prod)
      localStorage.setItem('products', JSON.stringify(arrayProd))
    }
    const productos = JSON.parse(localStorage.getItem('products'))
    
    const index = productos.findIndex(p => p.id === prod.id)
    if(index < 0){
      productos.push(prod)
      localStorage.setItem('products', JSON.stringify(productos))
    } else {
      const response = window.confirm("Estas seguro que quieres eliminar el producto?")
      if(response){
        productos.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(productos))
      }
    }
  }


  return (
    <>
      <div id={props.id}>
        <button className={s.buttonCarrito} onClick={() => addCarrito(props)} > 🛒 </button>
        <div className="group relative">
          <div className="min-h-[20%] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:aspect-none lg:h-60">
            <img
              src={props.image}
              alt="Phone_image"
              className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${props.id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {props.name}
                </Link>
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">{rom}</p> */}
            </div>
            <p className="text-sm font-medium text-gray-900">{props.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

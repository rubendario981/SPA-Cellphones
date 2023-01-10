import React, { useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getLengthCart } from '../../redux/actions';

const Products = ({ data }) => {
	const [productsCart, setProductsCart] = useState(JSON.parse(localStorage.getItem("products")))
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const addOrRemoveFromCart = async (cell) => {
		const index = productsCart.findIndex(el => el.id === cell.id)
		const addCell = { id: cell.id, name: cell.name, image: cell.image, price: cell.price, cant: 1, stock: cell.stock }
		if (index < 0) {
			const addCells = [...productsCart, addCell]
			localStorage.setItem("products", JSON.stringify(addCells))
			setProductsCart(addCells)
			dispatch(getLengthCart())
			Swal.fire({
				title: "Elemento agregado",
				text: `Haz agregado ${cell.name} correctamente`,
				icon: "success",
				timer: 2000
			})
		} else {
			const confirm = await Swal.fire({
				title: "Estas seguro?",
				text: `Estas seguro de eliminar ${cell.name} de tu carrito de compras?`,
				icon: "question",
				showCancelButton: true,
				confirmButtonText: "Eliminar",
				cancelButtonText: "Cancelar"
			})
			if (confirm.isConfirmed) {
				const updateProducts = productsCart.filter(el => el.id !== cell.id)
				localStorage.setItem("products", JSON.stringify(updateProducts))
				setProductsCart(updateProducts)
				dispatch(getLengthCart())
				Swal.fire({
					title: "Elemento eliminado",
					text: `Haz eliminado ${cell.name} correctamente`,
					icon: "info",
					timer: 2000
				})
			}
		}
	}

	const moreDetails = (cell) => {
		navigate(`/product/${cell.id}`)
	}
	
	return (
		<div className='flex flex-wrap justify-around'>
			{data.length > 0 &&
				data.map((cell, index) => (
					<div key={index} className='sm:w-11/12 md:w-5/12 lg:w-3/12 rounded-lg shadow-md hover:shadow-2xl hover:shadow-slate-400 hover:border hover:border-gray-300 m-3 cursor-pointer'>
						<div onClick={() => moreDetails(cell)}>
							<div className='rounded-t-lg w-full h-48'>
								<img className="w-full object-contain pt-2 max-h-48" src={cell.image} alt={cell.name} />
							</div>
							<div className="flex justify-between my-4">
								<h6 className="font-sans font-semibold pl-3 lowercase first-letter:capitalize">{cell.name}</h6>
								<h6 className='font-mono text-center pr-3'>$ {cell.price}</h6>
							</div>
						</div>
						<div className="flex justify-center mb-3">
							<button
								onClick={() => addOrRemoveFromCart(cell)}
								className={productsCart.find(el => el.id === cell.id) ? "rounded-md bg-red-500 text-white px-3 pb-1 hover:bg-red-600" : "rounded-md bg-green-500 text-white px-3 pb-1 hover:bg-green-600"}
							>
								{productsCart.find(el => el.id === cell.id)
									? <span className='inline-flex align-middle'>Eliminar del carrito <MdRemoveShoppingCart className='mt-1 mx-2 text-lg' /></span>
									: <span className='inline-flex align-middle'>Agregar al carrito 
									<FaCartArrowDown className='mt-1 mx-2 text-xl' /></span>
								}
							</button>
						</div>

					</div>
				))
			}
		</div>
	)
}

export default Products
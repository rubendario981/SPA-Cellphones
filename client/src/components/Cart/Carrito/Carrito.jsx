import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CarritoCard from "../CarritoCard/CarritoCard.jsx";

export default function Carrito() {
	const [update, setUpdate] = useState(false)
	const navigate = useNavigate();

	async function emptyCart() {
		const confirm = await Swal.fire({
			title: "Confirmar eliminacion",
			text: "Desea eliminar todo el contenido del carrito?",
			icon: "question",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Si, eliminar todo!!"
		})
		if (confirm.isConfirmed) {
			localStorage.setItem("products", JSON.stringify([]))
			setUpdate(!update)
		}
	}

	function handelBuy() {
		let productsStorage = JSON.parse(localStorage.getItem("products"))
		if (productsStorage.length) {
			setUpdate(!update)
			navigate("/detailCart")
		} else {
			alert("Para continuar con la compra, primero debes agregar productos a tu carrito.")
		}
	}
	const elementsCart = JSON.parse(localStorage.getItem("products"))

	let total = elementsCart?.map(e => parseInt(e.price))

	total = total.length > 1 ? total.reduce((a, b) => a + b, 0) : total

	return (
		<div className="h-full flex pb-5 mt-5">
			<div className="flex h-full bg-stone-300/40 border border-blue-500/20 mx-5 w-1/3 justify-center rounded-xl sticky top-20">
				<div className="flex flex-col py-4">
					<h1 className="text-xl font-bold text-gray-900">
						Resumen del carrito
					</h1>
					<div className="flex flex-col px-1">
						{elementsCart?.map((e, index) => {
							return (
								<div key={index} className="flex justify-between my-1 py-1">
									<h4 className="text-sm font-semibold lowercase first-letter:capitalize">{e.name}</h4>
									<p className="text-xs">{e.cant > 1 ? `${e.cant} x ${e.price} = $ ${parseInt(e.price) * e.cant}` : `$ ${e.price}`}</p>
								</div>
							)
						})
						}
					</div>
					<div className="flex justify-between my-1 w-full py-1">
						<h4 className="text-lg font-semibold">Total: </h4>{`$ ${total} `}
					</div>
					<div className="flex flex-col justify-between py-3 w-full">
						<button onClick={() => handelBuy()} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded mb-3"
							disabled={elementsCart.length ? false : true}>
							Ir a pagar
						</button>
						<button onClick={emptyCart} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded mb-2">
							Vaciar carrito
						</button>
					</div>
				</div>
			</div>

			<div className="flex w-full mr-5 justify-center rounded-xl items-start bg-stone-300/40 border border-blue-500/20">
				<div className="flex justify-center flex-wrap gap-10 p-4">
					{elementsCart?.map(e => <CarritoCard update={update} setUpdate={setUpdate} image={e.image} rom={e.rom} price={e.price} id={e.id} name={e.name} key={e.id} stock={e.stock} />)}
				</div>
			</div>
		</div>

	)
}
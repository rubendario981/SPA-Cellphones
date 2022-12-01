import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrder } from '../../redux/actions';
import Swal from "sweetalert2";

const ManageOrders = () => {
	const orders = useSelector(state => state.orders);
	const dispatch = useDispatch();
	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

	const changeStatus = async (order, total) => {
		const { value: formValues } = await Swal.fire({
			title: "Cambiar estado pedido de " + order.user.name,
			width: "80%",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Actualizar pedido",
			html: `			
				<form>
				<div class="mb-6">
					<label for="changeStatus" class="block mb-2 text-sm font-medium text-gray-900 text-left ml-20">Estado del pedido</label>
					<select 
						id="changeStatus" 
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 mx-auto p-2.5"
						name="status">
							<option defaultValue value='' hidden>Selecciona una opcion </option>
							<option value="Despachado">Despachado</option>
							<option value="Entregado">Entregado</option>
					</select>
				</div>
				<div class="mb-6">
					<label for="shipping" class="block mb-2 text-sm font-medium text-gray-900 text-left ml-20">Empresa transportadora</label>
					<input type="shipping" id="shipping" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 mx-auto p-2.5" placeholder="Empresa transportadora" required />
				</div>
				<div class="mb-6">
					<label for="code" class="block mb-2 text-sm font-medium text-gray-900 text-left ml-20">Codigo seguimiento</label>
					<input type="code" id="code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 mx-auto p-2.5" placeholder="Codigo guia transportadora" required/>
				</div>
				</form>
			`,
			preConfirm: () => {
				return [
					document.getElementById("changeStatus").value,
					document.getElementById("shipping").value,
					document.getElementById("code").value
				]
			}
		})

		if (formValues) {
			const data = {
				id: order.id,
				user: order.user,
				cellphones: order.cellphones,
				status: formValues[0],
				shipping: formValues[1],
				code: formValues[2],
				total
			}
			if (!data.status) {
				Swal.fire('Faltan campos para poder seguir', 'Por favor completa la informacion del pedido', 'warning')
			} else {
				const response = await dispatch(updateOrder(data))
				console.log(response, "on send form")
				response.payload
					? Swal.fire("Actualizado el estado del pedido", `Proceso de actualizacion del pedido de ${order.user.name} realizado correctamente`, 'success')
					: Swal.fire("Error al actualizar el pedido", `No se pudo realizar la actualizacion del pedido \n ${response}`, 'info')				
			}
		}
	}

	useEffect(() => {
		dispatch(getOrders())
	}, [dispatch])

	return (
		<div className='mb-16'>
			<div className="flex mb-4">
				<h5 className="font-bold text-center text-lg ml-10">
					Listdo de pedidos
				</h5>
			</div>
			{orders.map((order, index) => {
				let total = 0
				return (
					<div key={index} className="w-11/12 mx-auto mb-6 p-6 pb-12 bg-white border border-gray-400 rounded-lg shadow-md">
						<div className='flex justify-between mb-4'>
							<div className='w-7/12'>
								<h5 className="text-lg text-gray-900"><span className="font-bold">{index + 1} - </span> Estado: {order.status}</h5>
								<h5 className="mb-2 ml-7 text-lg text-gray-900"> Cliente: {order.user.name}</h5>
							</div>
							<button onClick={() => changeStatus(order, total)}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 px-4 rounded focus:outline-none focus:shadow-outline'>Cambiar estado ... </button>
						</div>

						<div className="overflow-x-auto relative">
							<table className="w-full text-sm text-left">
								<thead className="text-xs uppercase border-b border-t dark:border-gray-700 bg-blue-300">
									<tr>
										<th scope="col" className="py-3 px-2">
											No
										</th>
										<th scope="col" className="py-3 px-6">
											Producto
										</th>
										<th scope="col" className="py-3 px-6">
											Cantidad
										</th>
										<th scope="col" className="py-3 px-6">
											Valor
										</th>
										<th scope="col" className="py-3 text-end pr-6">
											SubTotal
										</th>
									</tr>
								</thead>
								{order.cellphones.map((cell, index) => {
									total += (cell.detailCart.cantidad * cell.detailCart.valor_unitario)
									return (
										<tbody key={index}>
											<tr className="bg-white border-b dark:border-gray-700">
												<th scope="row" className="py-4 px-2 text-gray-900">
													{index + 1}
												</th>
												<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
													{cell.name}
												</th>
												<td className="py-4 pl-12">
													{cell.detailCart.cantidad}
												</td>
												<td className="py-4 px-6">
													$ {cell.detailCart.valor_unitario}
												</td>
												<td className="py-4 px-6 text-right">
													{currencyFormat(cell.detailCart.cantidad * cell.detailCart.valor_unitario)}
												</td>
											</tr>
										</tbody>
									)
								})}
								<tfoot>
									<tr className="font-semibold text-gray-900 border-b border-gray-700 bg-blue-300">
										<th scope="row" colSpan={4} className="py-3 px-6 text-base">Total</th>
										<td className="py-3 px-6 font-bold text-end pr-6">$ {currencyFormat(total)}</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ManageOrders
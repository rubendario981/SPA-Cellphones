import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProfile } from '../../redux/actions';
import CurrentCart from './CurrentCart';
import DataUser from './DataUser';
import HistoryCarts from './HistoryCarts';
import UpdateUser from './UpdateUser';

const Perfil = () => {
	const [openTab, setOpenTab] = useState("Datos registrados");
	const userData = useSelector(state => state.user)
	const dispatch = useDispatch()
	const token = localStorage.getItem("token")
		
	useEffect(() => {
		if(!userData.findUser && token){
			const decodedToken = JSON.parse(window.atob(token?.split('.')[1]))
			async function perfilUser() {
				await dispatch(getProfile(decodedToken.id))
			}
			perfilUser()
		}

	}, [dispatch])

	const tabs = [
		{ name: "Datos registrados", content: <DataUser /> },
		{ name: "Actualizar perfil", content: <UpdateUser /> },
		{ name: "Ver carrito de compras", content: <CurrentCart /> },
		{ name: "Historial compras", content: <HistoryCarts/> },
	];

	return (
		<div className='mt-45 pt-15'>
			<div
				className='flex flex-row w-5/6 mx-auto border-2 border-blue-300 shadow-md shadow-blue-300'
			>
				<div className='w-1/3 border-r-4 border-blue-300'>
					<ul className="flex flex-col mt-6">
						{tabs.map((tab) => (
							<li
								key={tab.name}
								className="mb-4 px-3"
							>
								<NavLink
									to={tab.link}
									onClick={() => setOpenTab(tab.name)}
									className={tab.name === openTab ? "bg-blue-500 text-white hover:bg-blue-700 px-3 py-1 rounded-md m-3" : "bg-blue-300 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-md m-3"}
								>
									{tab.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div className="w-2/3 pl-6 pt-4">
					{tabs.map((tab) => (
						<div
							key={tab.name}
							className={tab.name === openTab ? "block" : "hidden"}
						>
							{tab.content}
						</div>
					))}
				</div>
			</div>

			{/* {carritos?.length === 0
				? <p>No hay productos en tu carrito</p>
				: carritos?.map(e => {
					return (
						<div classsName='flex flex-wrap justify-around border border-blue-400 m-6 p-6 bg-blue-200' key={e.id}>
							<h2 className='block w-screen'>Carrito No {e.id}</h2>
							<h3 className='block w-screen'>Estado de compra: {e.status}</h3>
							{e.cellphones.map((cell, index) => {
								return (
									<div className='' key={index}>
										<div className='p-6 w-96 mb-6 border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 '>
											<h3>Nombre: {cell?.name}</h3>
											<img src={cell?.image} width="100px" alt={cell?.name} />
											<h5>Precio de venta: $ {cell?.detailCart.valor_unitario}</h5>
											<h5>Unidades vendidas: {cell?.detailCart.cantidad}</h5>
											<h5>Subtotal: $ {cell?.detailCart.cantidad * cell?.detailCart.valor_unitario}</h5>
											<h5>Bateria :{cell?.battery}</h5>
										</div>
									</div>
								)
							})}
						</div>
					)
				})
			} */}
		</div>
	)
}

export default Perfil
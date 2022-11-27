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
		if (!userData.findUser && token) {
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
		{ name: "Historial compras", content: <HistoryCarts /> },
	];

	return (
		<div className='mt-45 pt-15'>
			<div className='flex flex-row w-5/6 mx-auto border-2 border-blue-300 shadow-md shadow-blue-300'>
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
		</div>
	)
}

export default Perfil
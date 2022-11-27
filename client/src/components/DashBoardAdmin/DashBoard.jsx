import React, { useEffect, useState } from 'react';
import FormProduct from "../FormProduct/FormProduct"
import logo from '../../assests/LOGO.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions';
import { MdOutlinePlaylistAdd, MdOutlineEditNote } from 'react-icons/md';
import { FaUserEdit } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb"
import EditForm from './EditForm';

const DashBoard = () => {
	const [openTab, setOpenTab] = useState("Editar celular");
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
		{ name: "Nuevo celular", content: <FormProduct />, icon: <MdOutlinePlaylistAdd /> },
		{ name: "Editar celular", content: <EditForm />, icon: <MdOutlineEditNote /> },
		{ name: "Administrar usuarios", content: "Administrar usuarios", icon: <FaUserEdit /> },
		{ name: "Administrar Pedidos", content: "Administrar pedidos", icon: <TbTruckDelivery /> },
	];
	return (
		<div className="flex">
			<div className="flex flex-col h-screen p-3 shadow shadow-gray-500 sm:w-60 md:w-80 lg:w-3/12">
				<div className="space-y-3">
					<div className="flex flex-col">
						<img src={logo} alt="Logo cellworld" className='w-20' />
						<h2 className="font-bold ">Panel administrativo</h2>
					</div>
					<div className="flex-1">
						<ul className="pt-2 pb-4 space-y-1 text-sm">
							{tabs.map((tab, index) => {
								return (
									<li key={index} className="rounded-sm">
										<Link
											to={tab.link}
											className={tab.name === openTab ? "flex items-center p-2 sm:space-x-2 md:space-x-3 rounded-md  bg-gray-600 text-white" : "flex items-center p-2 sm:space-x-2 md:space-x-3 rounded-md"}
											onClick={() => setOpenTab(tab.name)}
										>
											<span className='text-2xl'>{tab.icon}</span>
											<span>{tab.name}</span>
										</Link>
									</li>

								)
							})}
						</ul>
					</div>
				</div>
			</div>
			<div className="container mx-auto mt-2">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={tab.name === openTab ? "block" : "hidden"}
					>
						{tab.content}
					</div>
				))}
			</div>
		</div>
	)
}

export default DashBoard
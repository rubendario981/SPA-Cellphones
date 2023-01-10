import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { FcCellPhone, FcCamera, FcChargeBattery } from "react-icons/fc";
import { MdOutlineSdStorage } from "react-icons/md";
import { BsCpu } from "react-icons/bs";
import { SiWindowsterminal } from "react-icons/si";
import { SlScreenSmartphone } from "react-icons/sl";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "./Rating";

export default function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const phone = useSelector(state => state.detail)
	let addScores = 0
	// phone.ratings?.map(e => addScores += e.score)

	const stars = [];
	for (let i = 0; i < 5; i++) {
		i < Math.floor(addScores / phone.ratings?.length)
			? stars.push(<AiFillStar className='text-yellow-400 text-xl' />)
			: stars.push(<AiOutlineStar className='text-yellow-400 text-xl' />)
	}

	useEffect(() => {
		dispatch(getProductById(id))
	}, [dispatch])

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<div className="sm:flex sm:flex-col md:flex-row mx-auto sm:w-full md:w-11/12 lg:w-10/12">
			<div className="sm:w-full md:w-1/3 md:mr-3 lg:w-1/4 border border-gray-300 rounded-lg shadow-md">
				<div className="">
					<img className="max-sm:w-32 max-md:w-48 pt-8 pb-4 px-4 rounded-t-lg mx-auto" src={phone.image} alt={phone.name} />
				</div>
				<div className="px-5 pb-5">
					<h5 className="text-xl font-semibold tracking-tight text-gray-900">{phone.name}</h5>
					<p className="font-light text-gray-400 text-sm">{phone.brand?.name} - {phone.o?.name}</p>
					<p className="text-lg font-semibold text-blue-500">Antes <span className="ml-2 line-through font-light text-black"> $ {currencyFormat(phone.price * 1.25)}</span></p>
					<p className="text-xl font-bold text-emerald-600">Ahora ✳️✅ 🤩 <span className="block text-orange-500 text-2xl">$ {currencyFormat(phone.price * 1)}</span></p>

					<div className="flex flex-col mt-2.5 mb-5">
						{phone.ratings?.length > 0
							? <div className='flex flex-col'>
								<div className="flex align-middle justify-between">
									<span className="inline-flex">{stars}</span> 
									<small>{(addScores / phone.ratings?.length).toFixed(1)} / 5</small>

								</div>
								<small>{phone.ratings?.length} calificaciones</small>
							</div>
							: <small>Este telefono no tiene revisiones</small>
						}


					</div>
					<div className="flex items-center justify-center">
						<button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar al carrito 🛒</button>
					</div>
				</div>
			</div>
			<div className="sm:w-full sm:mt-4 md:w-2/3 md:mt-6 lg:w-3/4 bg-white rounded-lg shadow-md">
				<div>
					<h5 className="text-xl font-semibold tracking-tight text-blue-500 text-center mb-4">Ficha Tecnica de {phone.name}</h5>
					<ul className="w-11/12 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200">
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<FcCellPhone /> <span className="text-lg text-blue-500 mx-3">Marca: </span> <span className="text-sm mt-1">{phone.brand?.name}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<BsCpu /> <span className="text-lg text-blue-500 mx-3">Procesador: </span> <span className="text-sm mt-1">{phone.cpu}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<SiWindowsterminal /> <span className="text-lg text-blue-500 mx-3">Sistema operativo: </span> <span className="text-sm mt-1">{phone.o?.name}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<MdOutlineSdStorage /> <span className="text-lg text-blue-500 mx-3">Memoria interna: </span> <span className="text-sm mt-1">{phone.internal_storage}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<MdOutlineSdStorage /> <span className="text-lg text-blue-500 mx-3">Memoria RAM: </span> <span className="text-sm mt-1">{phone.ram}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<FcCamera /> <span className="text-lg text-blue-500 mx-3">Camara principal: </span> <span className="text-sm mt-1">{phone.rear_camera}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<FcCamera /> <span className="text-lg text-blue-500 mx-3">Camara frontal: </span> <span className="text-sm mt-1">{phone.front_camera}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<FcChargeBattery /> <span className="text-lg text-blue-500 mx-3">Bateria: </span> <span className="text-sm mt-1">{phone.battery}</span>
						</li>
						<li className="inline-flex relative items-center py-2 px-4 w-full text-2xl rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
							<SlScreenSmartphone /> <span className="text-lg text-blue-500 mx-3">Tipo pantalla: </span> <span className="text-sm mt-1">{phone.screen}</span>
						</li>
					</ul>
				</div>
				{phone.ratings?.length === 0
					? <div className='py-4 mt-4 mx-8 border border-gray-200 rounded-lg my-2'>
						<h5 className="text-xl font-semibold tracking-tight text-blue-500 text-center mb-4">Este celular aun no tiene comentarios</h5>

						<img src={'https://static.vecteezy.com/system/resources/previews/007/104/553/non_2x/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'} className="w-32 mx-auto" alt="without comments" />

					</div>
					: phone.ratings?.map((rate, index) => (
						<Rating key={index} title={rate.title} comment={rate.comment} score={rate.score} date={rate.createdAt} user={rate.userId} />
					))
				}
			</div>
		</div>
	)



}
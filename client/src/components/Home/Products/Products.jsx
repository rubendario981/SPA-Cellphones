// import { Fragment, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
// import ProductCard from "../ProductCard/ProductCard";
// import NavBar from "../NavBar/NavBar";
// import Filters from "../Filters/Filters";
// import Order from "../Order/Order";
// import Alert from "../../Modals/Alert.jsx";
// import Carrousel from "../../Carrousel/Carrousel";
// import { getProducts } from "../../../redux/actions";

// export default function Products() {
//   let products = useSelector((state) => state.showProducts);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [dataModal, setDataModal] = useState({ show: false, title: '', message: '' });
//   const dispatch = useDispatch()


//   let firstPage = () => {
//     setCurrentPage(0);
//   };

//   let nextPage = () => {
//     if (products.length <= currentPage + 8) {
//       setCurrentPage(currentPage);
//     } else setCurrentPage(currentPage + 8);
//   };

//   let previousPage = () => {
//     if (currentPage < 8) {
//       setCurrentPage(0);
//     } else setCurrentPage(currentPage - 8);
//   };

//   let selectPage = (event) => {
//     setCurrentPage(parseInt(event.target.value));
//   };

//   useEffect(() => {
//     firstPage();
//     dispatch(getProducts())
//   }, []);

//   const showProducts = products.slice(currentPage, currentPage + 8);

//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   !localStorage.getItem("products") && localStorage.setItem("products", "[]")

//   return (
//     <div className="bg-white">
//       <Carrousel />
//       <div>
//         {/* { Responsive } */}
//         <Transition.Root show={mobileFiltersOpen} as={Fragment}>
//           <Dialog
//             as="div"
//             className="relative z-40 lg:hidden"
//             onClose={setMobileFiltersOpen}
//           >
//             <Transition.Child
//               as={Fragment}
//               enter="transition-opacity ease-linear duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity ease-linear duration-300"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black bg-opacity-25" />
//             </Transition.Child>
//             <div className="fixed inset-0 z-40 flex">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transition ease-in-out duration-300 transform"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transition ease-in-out duration-300 transform"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//                   <div className="flex items-center justify-between px-4">
//                     <h2 className="text-lg font-medium text-gray-900">
//                       Filters
//                     </h2>
//                     <button
//                       type="button"
//                       className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                       onClick={() => setMobileFiltersOpen(false)}
//                     >
//                       <span className="sr-only">Close menu</span>
//                       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                     </button>
//                   </div>
//                   Filters
//                   <form className="mt-4 border-t border-gray-200">
//                     <h3 className="sr-only">Categories</h3>
                    
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </Dialog>
//         </Transition.Root>

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <Alert show={dataModal.show} title={dataModal.title} message={dataModal.message} />
//           <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Nuestros productos
//             </h1>

//             <div className="flex items-center">
//               <Order />
//               <button
//                 type="button"
//                 className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pt-6 pb-24">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="flex flex-row gap-x-8 gap-y-10">
//               <Filters />

//               <div className="bg-white">
//                 <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                   {showProducts.map((product) => {
//                     return (
//                       <ProductCard
//                         id={product.id}
//                         key={product.id}
//                         name={product.name}
//                         image={product.image}
//                         price={product.price}
//                         screen={product.screen}
//                         internal_storage={product.internal_storage}
//                         ram={product.ram}
//                         front_camera={product.front_camera}
//                         rear_camera={product.rear_camera}
//                         cpu={product.cpu}
//                         battery={product.battery}
//                         color={product.color}
//                         description={product.description}
//                         stock={product.stock}
//                         oId={product.oId}
//                         brandId={product.brandId}
//                         setDataModal={setDataModal}
//                       />
//                     );
//                   })}
//                 </div>
//                 <NavBar
//                   length={Math.ceil(products.length / 8)}
//                   set={selectPage}
//                   prev={previousPage}
//                   next={nextPage}
//                 />
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div >
//   );
// }
import React from 'react'

const Products = () => {
	return (
		<div>Products</div>
	)
}

export default Products
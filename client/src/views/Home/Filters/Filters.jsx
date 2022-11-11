import React, { Component } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { HandRaisedIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  filterProduct,
  getProducts,
  resetFilter,
} from "../../../redux/actions";

// class Filters extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       marcas: [
//         { value: "Apple", label: "Apple" },
//         { value: "Samsung", label: "Samsung" },
//         { value: "Huawei", label: "Huawei" },
//       ],
//       filtro: "",
//     };
//   }

//   handleFilter(event) {
//     this.setState((prev) => ({
//       ...prev,
//       filtro: event.target.name,
//     }));

//     console.log(this.state.filtro);
//   }

//   render() {
//     return (
//       <form className="hidden lg:block basis-1/4">
//         <h3 className="sr-only">Categories</h3>

//         <Disclosure as="div" className="border-b border-gray-200 py-6">
//           {({ open }) => (
//             <>
//               <h3 className="-my-3 flow-root">
//                 <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                   <span className="font-medium text-gray-900">Marcas</span>
//                   <span className="ml-6 flex items-center">
//                     {open ? (
//                       <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                     ) : (
//                       <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                     )}
//                   </span>
//                 </Disclosure.Button>
//               </h3>

//               <Disclosure.Panel className="pt-6">
//                 <div className="space-y-4">
//                   {this.state.marcas.map((option, optionIdx) => (
//                     <div key={option.value} className="flex items-center">
//                       <input
//                         id={option.value}
//                         name={option.label}
//                         defaultValue={option.value}
//                         type="checkbox"
//                         checked={
//                           option.value === this.state.filtro ? true : false
//                         }
//                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         onChange={(e) => this.handleFilter(e)}
//                       />
//                       <label className="ml-3 text-sm text-gray-600">
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>
//       </form>
//     );
//   }
// }

// export default Filters;

const Filters = () => {
  const marcas = useSelector((state) => state.brands);
  const almacenamiento = [
    "4 MB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
    "512 GB",
  ];

  const [filtro, setFiltro] = useState({
    marca: "",
    almacenamiento: "",
  });

  const dispatch = useDispatch();

  function handleFilter(event) {
    setFiltro({
      ...filtro,
      [event.target.value]: [event.target.name],
    });
    // dispatch(filterProduct(filtro));
  }

  useEffect(() => {
    console.log(filtro);
    dispatch(filterProduct(filtro));
  }, [dispatch, filtro]);

  return (
    <form className="hidden lg:block basis-1/4">
      <h3 className="sr-only">Categories</h3>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Marcas</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>

            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {marcas.map((option, optionIdx) => (
                  <div key={optionIdx} className="flex items-center">
                    <input
                      id={option}
                      name={option}
                      value={"marca"}
                      type="checkbox"
                      checked={option === filtro.marca ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleFilter(e)}
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  Almacenamiento
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>

            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {almacenamiento.map((option, optionIdx) => (
                  <div key={optionIdx} className="flex items-center">
                    <input
                      id={option}
                      name={option}
                      value="almacenamiento"
                      type="checkbox"
                      checked={option === filtro.storage ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleFilter(e)}
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </form>
  );
};

export default Filters;

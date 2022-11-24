import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { HandRaisedIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "../SearchBar/SearchBar";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  filterBrand,
  // filterStorage,
  // resetFilter,
} from "../../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();

  const cellPhoneList = useSelector(s => s.allProducts)
  const marcas = useSelector((state) => state.brands);

  const [marca, setMarca] = useState("");
  const [storage, setStorage] = useState("");

  let filteredByBrand = []
  let filteredByStorage = []
  let almacenamiento = []
  cellPhoneList.forEach(e => !almacenamiento.includes(e.internal_storage.replace("GB", "").trim()) && almacenamiento.push(e.internal_storage.replace("GB", "")))
  console.log("* ", almacenamiento);


  function handleMarca(e) {
    let value = e.target.value;
    if (value === marca) {
      if (storage !== "") {
        filteredByBrand = cellPhoneList.filter(e => e.internal_storage.includes(storage))
      } else {
        filteredByBrand = cellPhoneList
      }
      setMarca("")
    } else {
      if (storage !== "") {
        filteredByBrand = cellPhoneList.filter(e => e.brand.name === value && e.internal_storage.includes(storage))
      } else {
        filteredByBrand = cellPhoneList.filter(e => e.brand.name === value)
      }
      setMarca(value)
    }
    dispatch(filterBrand(filteredByBrand))
  }

  function handleStorage(e) {
    let value = e.target.value
    if (marca === "") {
      filteredByStorage = cellPhoneList.filter(e => e.internal_storage === value)
    } else {
      filteredByStorage = cellPhoneList.filter(e => e.internal_storage === value && e.brand.name === marca)
    }
    if (storage === value) {
      if (marca !== "") {
        filteredByStorage = cellPhoneList.filter(e => e.brand.name === marca)
      } else {
        filteredByStorage = cellPhoneList
      }
      setStorage("")
    }
    else setStorage(value)
    dispatch(filterBrand(filteredByStorage))
  }


  return (
    <form className="hidden lg:block basis-1/4">
      <h3 className="sr-only">Categories</h3>
      <SearchBar />
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
                      id={option.id}
                      name={"marca"}
                      value={option.name}
                      type="checkbox"
                      checked={option.name === marca ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleMarca(e)}
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {option.name}
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
                {almacenamiento.map((e, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      id={i}
                      name="storage"
                      value={e}
                      type="checkbox"
                      checked={e === storage ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(event) => handleStorage(event)}
                    />
                    <label className="ml-3 text-sm text-gray-600">
                      {e}
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

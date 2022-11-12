import React, { Component } from "react";
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
  filterStorage,
  resetFilter,
} from "../../../redux/actions";

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

  const [marca, setMarca] = useState("");
  const [storage, setStorage] = useState("");
  const dispatch = useDispatch();

  function handleMarca(event) {
    dispatch(resetFilter());
    setTimeout(() => {
      dispatch(filterStorage(storage));
    }, 500);
    if (marca === event.target.name) {
      setMarca("");
    } else {
      setMarca(event.target.name);
      setTimeout(() => {
        dispatch(filterBrand(event.target.name));
      }, 500);
    }
  }

  function handleStorage(event) {
    dispatch(resetFilter());
    setTimeout(() => {
      dispatch(filterBrand(marca));
    }, 500);
    if (storage === event.target.name) {
      setStorage("");
    } else {
      setStorage(event.target.name);
      setTimeout(() => {
        dispatch(filterStorage(event.target.name));
      }, 500);
    }
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
                      id={option}
                      name={option}
                      value={"marca"}
                      type="checkbox"
                      checked={option === marca ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleMarca(e)}
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
                      value="storage"
                      type="checkbox"
                      checked={option === storage ? true : false}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={(e) => handleStorage(e)}
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

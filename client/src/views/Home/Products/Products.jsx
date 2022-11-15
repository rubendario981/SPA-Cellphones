import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductCard from "../ProductCard/ProductCard";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import Order from "../Order/Order";
import Alert from "../../Modals/Alert.jsx";

export default function Products() {
  const products = useSelector((state) => state.showProducts);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataModal, setDataModal] = useState({ show: false, title: '', message: '' });

  let firstPage = () => {
    setCurrentPage(0);
  };

  let nextPage = () => {
    if (products.length <= currentPage + 8) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 8);
  };

  let previousPage = () => {
    if (currentPage < 8) {
      setCurrentPage(0);
    } else setCurrentPage(currentPage - 8);
  };

  let selectPage = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };



  useEffect(() => {
    firstPage();
  }, [products]);

  const showProducts = products.slice(currentPage, currentPage + 8);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        {/* { Responsive } */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  Filters
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {/* <ul className="px-2 py-3 font-medium text-gray-900">
                      {subCategories?.map((category) => (
                        <li key={category}>
                          <button>{category}</button>
                        </li>
                      ))}
                    </ul> */}
                    {/* {filters?.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))} */}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Alert show={dataModal.show} title={dataModal.title} message={dataModal.message} />
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Nuestros productos
            </h1>

            <div className="flex items-center">
              <Order />
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex flex-row gap-x-8 gap-y-10">
              <Filters />

              <div className="bg-white">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {showProducts.map((product) => {
                    return (
                      <ProductCard
                        id={product.id}
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        setDataModal={setDataModal}
                      />
                    );
                  })}
                </div>
                <NavBar
                  length={Math.ceil(products.length / 8)}
                  set={selectPage}
                  prev={previousPage}
                  next={nextPage}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div >
  );
}
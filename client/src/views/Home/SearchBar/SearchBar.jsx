import { getProductByName } from "../../../redux/actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();

  function handleSearch(event) {
    dispatch(getProductByName(event.target.value));
  }

  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Buscar por nombre
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center pl-3">
          {/* <span className="text-gray-500 sm:text-sm">$</span> */}
          <span className="text-gray-500 sm:text-base material-symbols-outlined">
            search
          </span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          onChange={(e) => handleSearch(e)}
          placeholder="Buscar..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {/* <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}

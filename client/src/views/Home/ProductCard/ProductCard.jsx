import React from "react";

const ProductCard = ({ name, image, rom, price }) => {
  return (
    // <div>
    //   <img src={image} alt="product_image" />
    //   <h3>{name}</h3>
    //   <h4>{rom}</h4>
    //   <h4>{ram}</h4>
    //   <h4>{cpu}</h4>
    //   <h4>{price}</h4>
    // </div>
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={image}
          alt="Phone_image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{rom}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

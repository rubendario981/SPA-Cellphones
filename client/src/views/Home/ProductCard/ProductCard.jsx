import React from "react";

const ProductCard = ({ name, image, rom, ram, cpu, price }) => {
  return (
    <div>
      <img src={image} alt="product_image" />
      <h3>{name}</h3>
      <h4>{rom}</h4>
      <h4>{ram}</h4>
      <h4>{cpu}</h4>
      <h4>{price}</h4>
    </div>
  );
};

export default ProductCard;

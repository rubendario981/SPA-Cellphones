import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Header from "../Header/Header";
import styles from "./Products.module.css";

export default function Products() {
  const products = useSelector((state) => state.products);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {products.map((product) => {
          return (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard
                name={product.name}
                image={product.image}
                rom={product.internal_storage}
                ram={product.ram}
                cpu={product.cpu}
                price={product.price}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

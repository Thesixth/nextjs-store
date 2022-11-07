import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
import { Store } from "../utils/Store";

export default function Home() {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = (product) => {
    console.log(product);
    console.log(state.cart);
    const itemInCart = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = itemInCart ? itemInCart.quantity + 1 : 1;
    dispatch({ type: "AddToCart", payload: { ...product, quantity } });
  };
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

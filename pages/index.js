import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
import downArrow from "../assets/images/downarrow.png";
import { Store } from "../utils/Store";
import Image from "next/image";

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
      <section className="header-content">
        <div className="hero">
          <h1 className="hero-header pop-animation">Welcome to Ligthly</h1>
          <p className="hero-subtitle pop-animation">
            Find yourself a new love
          </p>
          <p class="header-button pop-animation">
            <a href="#shop" class="button">
              Shop All
            </a>
          </p>
        </div>
        <div className="header-down-arrow">
          <Image src={downArrow} alt="Hero Image" width={50}></Image>
        </div>
      </section>

      <div
        id="shop"
        className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
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

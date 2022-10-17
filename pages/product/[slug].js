import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/Store";

export default function ProductDetails() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }

  let stockCheck;
  if (product.countInStock === 0) {
    stockCheck = true;
  } else {
    stockCheck = false;
  }
  const addToCartHandler = () => {
    console.log(product);
    console.log(state.cart);
    const itemInCart = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = itemInCart ? itemInCart.quantity + 1 : 1;
    dispatch({ type: "AddToCart", payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Products</Link>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className="">
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <span>Price</span>
                <span>${product.price}</span>
              </div>
              <button
                disabled={stockCheck}
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

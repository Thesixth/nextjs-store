import Cookies from "js-cookie";
import Router from "next/router";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { state, dispatch } = useContext(Store);
  console.log(state.cart.shippingAddress);

  useEffect(() => {
    setValue("fullName", state.cart.shippingAddress.fullName);
    setValue("address", state.cart.shippingAddress.address);
    setValue("city", state.cart.shippingAddress.city);
    setValue("postalCode", state.cart.shippingAddress.postalCode);
    setValue("country", state.cart.shippingAddress.country);
  }, [setValue, state.cart.shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "Save_Shipping_Address",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...state.cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    Router.push("/payment");
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            autoFocus
            id="fullName"
            {...register("fullName", {
              required: "Please enter your full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register("address", {
              required: "Please enter your Address",
              minLength: {
                value: 3,
                message: "Address should be at least 5 characters",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            {...register("city", {
              required: "Please enter your city",
              minLength: {
                value: 3,
                message: "City cannot be left blank ",
              },
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            {...register("postalCode", {
              required: "Please enter your Postal Code",
              minLength: {
                value: 3,
                message: "Postal Code cannot be left blank ",
              },
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            {...register("country", {
              required: "Please enter your Country",
              minLength: {
                value: 3,
                message: "Country cannot be left blank ",
              },
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

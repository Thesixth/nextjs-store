import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropDownLink from "./DropDownLink";
import Cookies from "js-cookie";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);

  const logOutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "Cart_Reset" });
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>{title ? title : "Lightly"}</title>
        <meta name="description" content="Lightly used products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/">
              <a className="text-lg font-bold">Ligthly</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {state.cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {state.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-700">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropDownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropDownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropDownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropDownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logOutHandler}
                      >
                        LogOut
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <a
            href="http://www.paliemmanuel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emmanuel Pali
          </a>
        </footer>
      </div>
    </>
  );
}

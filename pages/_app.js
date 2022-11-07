import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();
export default MyApp;

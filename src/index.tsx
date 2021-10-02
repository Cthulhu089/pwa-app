import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA0hGXXO5c3QuVH7tumL6wG0AgcFsPhgAU",
  authDomain: "pwa-app-bad34.firebaseapp.com",
  projectId: "pwa-app-bad34",
  storageBucket: "pwa-app-bad34.appspot.com",
  messagingSenderId: "1053967934127",
  appId: "1:1053967934127:web:6f323cb2964e3d5747ea5a",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

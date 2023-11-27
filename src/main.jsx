import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

window.axios = axios;
window.axios.defaults.baseURL = 'https://parcial3-production-b2a9.up.railway.app';
// window.axios.defaults.headers.common['Accept'] = 'application/json';
// window.axios.defaults.headers.common['Content-Type'] = 'application/json';
// window.axios.defaults.headers.common['X-Requested-Width'] = 'XMLHttpRequest';
// window.axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../bootstrap/css/bootstrap.min.css';
import router from './App.jsx'
import {RouterProvider} from "react-router-dom";
import App from './routes/test.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </React.StrictMode>,
)

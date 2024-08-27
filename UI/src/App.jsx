import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import ErrorPage from "./routes/error-page.jsx";
import App from "./routes/possession.jsx";
import Create from "./routes/createPossession.jsx";
import Update from "./routes/updatePossession.jsx";
// function Header(){

// }

// function SideBar(){

// }

// export default function App(){

// }



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },

  {
    path: "/possession",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  
  {
    path: "/possession/create",
    element: <Create/>,
    errorElement: <ErrorPage/>
  },

  {
    path: "/possession/:libelle/update",
    element: <Update/>,
    errorElement: <ErrorPage/>
  },
]);

export default router;
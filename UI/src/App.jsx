import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import ErrorPage from "./routes/error-page.jsx";
import Possessions from "./routes/possession.jsx";
import Create from "./routes/createPossession.jsx";
import Update from "./routes/updatePossession.jsx";
import Patrimoine from "./routes/patrimoine.jsx";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },

  {
    path: "/possession",
    element: <Possessions/>,
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

  {
    path: "/patrimoine",
    element: <Patrimoine/>,
    errorElement: <ErrorPage/>
  }
]);

export default router;
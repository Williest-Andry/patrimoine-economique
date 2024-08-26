import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import ErrorPage from "./routes/error-page.jsx";
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
]);

export default router;
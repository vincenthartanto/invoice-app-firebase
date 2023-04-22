import "./App.css";

import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Page/Home";
import InvoiceDetail from "./Components/InvoiceDetail";
import InvoiceForm from "./Page/InvoiceForm";
import DarkModeContextProvider from "./Context/DarkModeContextProvider";
import Login from "./Page/Login";
import { useSelector } from "react-redux";

function App() {
  // const auth = useSelector((state) => state.auth);
  const RequiredAuth = ({ children }) => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? children : <Navigate to="login"></Navigate>;
  };

  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login></Login>,
    },
    {
      element: (
        <RequiredAuth>
          <RootLayout></RootLayout>
        </RequiredAuth>
      ),
      children: [
        {
          index: true,
          path: "",
          element: <Home></Home>,
        },

        {
          path: "invoice/detail/:id",
          element: <InvoiceDetail></InvoiceDetail>,
        },
        {
          path: "invoice/new",
          element: <InvoiceForm></InvoiceForm>,
        },
        {
          path: "edit/:id",
          element: <InvoiceForm editMode={true}></InvoiceForm>,
        },
      ],
    },
  ]);
  return (
    <DarkModeContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </DarkModeContextProvider>
  );
}

export default App;

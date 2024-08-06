
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Registration from "./Pages/Registration/Registration";
import Layout from "./Layout/Layout";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import ShopCart from "./Pages/ShopCart/ShopCart";
import Checkout from "./Pages/Checkout/Checkout";
import Order from "./Pages/Order/Order";
import PostProduct from "./Pages/PostProduct/PostProduct";
import AuthCheck from "./utils/AuthCheck";
import ProtectedRout from "./utils/ProtectedRout";
import LogIn from "./Pages/Login/Login";
import EditProduct from "./Pages/EditProduct/EditProduct";
import Category from "./Pages/Category/Category";


function App()
{

  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:<LogIn/>
      },
      {
        path:"registration",
        element: <Registration/>
      },
      {
        path:"dashboard",
        element:<Layout/>,
        children:
        [
          {
            index: true,
            element: <Home/>
          },
          {
            path:"product",
            element: <Products/>
          },
          {
            path:"cart/:id",
            element:<Cart/>
          },
          {
            path:"*",
            element:<NotFound/>
          },
          {
            path:"shopCart",
            element:<ShopCart/>
          },
          {
            path:"Checkout",
            element:<Checkout/>
          },
          {
            path:"Profile",
            element:<Profile/>
          },
          {
            path:"order",
            element:<Order/>
          },
          {
            path:"PostProduct",
            element:<PostProduct/>
          },
          {
            path:"EditProduct/:id",
            element:<EditProduct/>
          },
          {
            path:"category",
            element:<Category/>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router} />
}

export default App

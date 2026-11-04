import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Treatments from "../pages/treatments/page";
import TreatmentDetail from "../pages/treatments/detail/page";
import Shop from "../pages/shop/page";
import ShopProductDetail from "../pages/shop/detail/page";
import About from "../pages/about/page";
import Faq from "../pages/faq/page";
import Contact from "../pages/contact/page";
import Legal from "../pages/legal/page";
import Quiz from "../pages/quiz/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/treatments",
    element: <Treatments />,
  },
  {
    path: "/treatments/:slug",
    element: <TreatmentDetail />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:slug",
    element: <ShopProductDetail />,
  },
  {
    path: "/products/:slug",
    element: <ShopProductDetail />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/legal/:slug",
    element: <Legal />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
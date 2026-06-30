import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@pages/layouts/Layout";
import CatalogPage from "@pages/catalog/Catalog";
import AboutPage from "@pages/about/about";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element:<CatalogPage /> },
      {
        path: "/about", element:<AboutPage />
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <></>,
  // },
]);

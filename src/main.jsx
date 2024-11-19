import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProductPage from "../ProductPage.jsx";
import StorePage from "./StorePage.jsx";
import CartPage from "../CartPage.jsx";

const errorElement = <h1>Oopsie! That page is not available yet!</h1>;

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <StorePage />, index: true },
      { path: "/products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
    ],
    errorElement: errorElement,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    />
  </StrictMode>
);

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
// import App from "./App.tsx";
import { QueryProvider } from "./api/providers/QueryClient.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AppBootstrap } from "./components/AppBootstrap.tsx";
import { router } from "./routes/router.tsx";
import CustomToaster from "./components/CustomToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <CustomToaster />
    <Provider store={store}>
      <AppBootstrap>
        <RouterProvider router={router} />
      </AppBootstrap>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </Provider>
  </QueryProvider>
);

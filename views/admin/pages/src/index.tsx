import React from "react";
import ReactDOM from "react-dom/client";
import "./types";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("woopriceman-admin-pages") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);

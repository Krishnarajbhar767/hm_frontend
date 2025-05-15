import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ReduxProvider store={store}>
            <App />
            <Toaster />
        </ReduxProvider>
    </BrowserRouter>
);

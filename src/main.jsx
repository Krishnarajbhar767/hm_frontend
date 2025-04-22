import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </BrowserRouter>
    </StrictMode>
);

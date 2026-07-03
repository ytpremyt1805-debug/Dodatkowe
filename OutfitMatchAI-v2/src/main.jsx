import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import WardrobeProvider from "./contexts/WardrobeContext";
import UserProvider from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <BrowserRouter>

            <UserProvider>

                <WardrobeProvider>

                    <App />

                </WardrobeProvider>

            </UserProvider>

        </BrowserRouter>

    </React.StrictMode>

);
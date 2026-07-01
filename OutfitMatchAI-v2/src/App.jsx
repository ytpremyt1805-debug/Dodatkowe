import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Wardrobe from "./pages/Wardrobe";
import Chat from "./pages/Chat";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

export default function App() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/chat"
                    element={<Chat />}
                />

                <Route
                    path="/wardrobe"
                    element={<Wardrobe />}
                />

                <Route
                    path="/favorites"
                    element={<Favorites />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Route>

        </Routes>

    );

}
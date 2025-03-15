import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListaPersonajes from "./pages/ListaPersonajes";
import CrearPersonaje from "./pages/CrearPersonaje";
import EditarPersonaje from "./pages/EditarPersonaje";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ListaPersonajes />} />
                <Route path="/crear" element={<CrearPersonaje />} />
                <Route path="/editar/:id" element={<EditarPersonaje />} />
            </Routes>
        </Router>
    );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">The Dark Knight</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">Inicio</Link>
                    <Link to="/crear" className="hover:text-gray-300">Crear Personaje</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

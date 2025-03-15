import React, { useState } from "react";
import { createPersonaje } from "../services/api";
import {useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CrearPersonaje = () => {
    const [personaje, setPersonaje] = useState({
        nombre: "",
        identificacion: "",
        imagenUrl: "",
        rol: "",
        descripcion: ""
    });
    
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setPersonaje({ ...personaje, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!personaje.nombre || !personaje.identificacion || !personaje.rol || !personaje.descripcion) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (personaje.imagenUrl && !personaje.imagenUrl.startsWith("http")) {
            setError("Ingrese una URL válida para la imagen.");
            return;
        }

        try {
            await createPersonaje(personaje);
            mostrarAlerta("success", "Personaje creado exitosamente!");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setError("Error al crear personaje. Inténtalo nuevamente.");
            console.error("Error al crear personaje:", error);
        }
    };

    const mostrarAlerta = (icono, mensaje) => {
            Swal.fire({
                toast: true,
                position: "bottom-end", // 👈 Aparece en la esquina inferior derecha
                icon: icono,
                title: mensaje,
                showConfirmButton: false, // 👈 Elimina el botón de confirmación
                timer: 3000, // 👈 Se cierra automáticamente después de 5 segundos
                timerProgressBar: true, // 👈 Barra de progreso mientras desaparece
                customClass: {
                    popup: "text-sm", // 👈 Reduce el tamaño de la alerta
                },
            });
        };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Crear Personaje</h2>

            {error && <p className="text-red-500 text-center">{error}</p>} {/* Muestra errores en rojo */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Identificación:</label>
                    <input 
                        type="text" 
                        name="identificacion" 
                        placeholder="Identificación" 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">URL de Imagen:</label>
                    <input 
                        type="text" 
                        name="imagenUrl" 
                        placeholder="URL de Imagen" 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Rol:</label>
                    <input 
                        type="text" 
                        name="rol" 
                        placeholder="Rol" 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Descripción" 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                    Guardar Personaje
                </button>
            </form>
        </div>
    );
};

export default CrearPersonaje;

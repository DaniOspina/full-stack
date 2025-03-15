import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPersonajeById, updatePersonaje } from "../services/api";
import Swal from "sweetalert2";

const EditarPersonaje = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personaje, setPersonaje] = useState(null);

    useEffect(() => {
        cargarPersonaje();
    }, []);

    const cargarPersonaje = async () => {
        try {
            const response = await getPersonajeById(id);
            setPersonaje(response.data);
        } catch (error) {
            console.error("Error al obtener personaje:", error);
            mostrarAlerta("error", "No se pudo cargar el personaje.");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!personaje.nombre || !personaje.identificacion || !personaje.rol || !personaje.descripcion) {
            mostrarAlerta("warning", "Todos los campos son obligatorios.");
            return;
        }

        try {
            await updatePersonaje(id, personaje);
            mostrarAlerta("success", "Personaje actualizado correctamente.");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            console.error("Error al actualizar personaje:", error);
            mostrarAlerta("error", "No se pudo actualizar el personaje.");
        }
    };

    if (!personaje) return <p className="text-center text-gray-600">Cargando personaje...</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Editar Personaje</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={personaje.nombre} 
                        onChange={(e) => setPersonaje({ ...personaje, nombre: e.target.value })} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Identificación:</label>
                    <input 
                        type="text" 
                        name="identificacion" 
                        value={personaje.identificacion} 
                        onChange={(e) => setPersonaje({ ...personaje, identificacion: e.target.value })} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">URL de Imagen:</label>
                    <input 
                        type="text" 
                        name="imagenUrl" 
                        value={personaje.imagenUrl || ""} 
                        onChange={(e) => setPersonaje({ ...personaje, imagenUrl: e.target.value })} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Rol:</label>
                    <input 
                        type="text" 
                        name="rol" 
                        value={personaje.rol} 
                        onChange={(e) => setPersonaje({ ...personaje, rol: e.target.value })} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        value={personaje.descripcion} 
                        onChange={(e) => setPersonaje({ ...personaje, descripcion: e.target.value })} 
                        required 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-between">
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
                    </button>

                    <button 
                        type="button" 
                        onClick={() => navigate("/")} 
                        className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPersonaje;

import React, { useEffect, useState } from "react";
import { getPersonajes, deletePersonaje } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";

const ListaPersonajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [orden, setOrden] = useState("id"); // Estado para el orden seleccionado
    const navigate = useNavigate();

    useEffect(() => {
        cargarPersonajes();
    }, [orden]); // 👈 Se ejecuta cuando cambia el orden

    const cargarPersonajes = async () => {
        try {
            const response = await getPersonajes(orden);
            setPersonajes(response.data);
        } catch (error) {
            console.error("Error al obtener personajes:", error);
        }
    };

    const mostrarDetalles = (personaje) => {
        Swal.fire({
            title: personaje.nombre,
            html: `
                <div class="flex flex-col items-center">
                    <div class="w-48 h-48 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden shadow-md">
                        ${personaje.imagenUrl ? 
                            `<img src="${personaje.imagenUrl}" alt="${personaje.nombre}" class="w-full h-full object-cover"/>` 
                            : `<span class="text-gray-500">Sin imagen</span>`
                        }
                    </div>
                    <p class="text-gray-600 mt-4"><strong>Rol:</strong> ${personaje.rol}</p>
                    <p class="text-gray-600"><strong>Descripción:</strong> ${personaje.descripcion}</p>
                    <p class="text-gray-600"><strong>Fecha de Creación:</strong> ${personaje.fechaCreacion}</p>
                </div>
            `,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Editar",
            denyButtonText: "Eliminar",
            cancelButtonText: "Cerrar",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/editar/${personaje.id}`);
            } else if (result.isDenied) {
                confirmarEliminar(personaje.id);
            }
        });
    };
    

    const confirmarEliminar = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deletePersonaje(id);
                    Swal.fire("Eliminado", "El personaje ha sido eliminado.", "success");
                    cargarPersonajes();
                } catch (error) {
                    console.error("Error al eliminar personaje:", error);
                }
            }
        });
    };

    return (
        <div>
            <Banner />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Lista de Personajes</h2>

                <div className="flex justify-center gap-4 mb-6">
                    <button 
                        onClick={() => setOrden("nombre")}
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                    >
                        Ordenar por Nombre
                    </button>
                    <button 
                        onClick={() => setOrden("fecha")}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Ordenar por Fecha
                    </button>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {personajes.map((personaje) => (
                        <div
                            key={personaje.id}
                            onClick={() => mostrarDetalles(personaje)}
                            className="cursor-pointer p-4 border rounded-lg shadow-md bg-white hover:bg-gray-100 transition transform hover:scale-105"
                        >
                            {personaje.imagenUrl ? (
                                <img src={personaje.imagenUrl} alt={personaje.nombre} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                                    <span className="text-gray-500">Sin imagen</span>
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-800">{personaje.nombre}</h3>
                            <p className="text-gray-600">{personaje.rol}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListaPersonajes;

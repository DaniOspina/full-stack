import axios from "axios";

const API_URL = "http://localhost:8080/api/personajes";

export const getPersonajes = async (orden = "id") => {
    return await axios.get(`${API_URL}?orden=${orden}`);
};

export const getPersonajeById = async (id) => {
    if (!id) {
        throw new Error("ID no válido en la petición.");
    }
    return await axios.get(`${API_URL}/${id}`);
};

export const createPersonaje = async (personaje) => {
    return await axios.post(API_URL, personaje);
};

export const updatePersonaje = async (id, personaje) => {
    if (!id) {
        throw new Error("ID no válido en la petición.");
    }
    return await axios.put(`${API_URL}/${id}`, personaje);
};

export const deletePersonaje = async (id) => {
    console.log("ID enviado a la API para eliminar:", id); // 👈 Depuración
    if (!id) {
        throw new Error("ID no válido en la petición.");
    }
    return await axios.delete(`${API_URL}/${id}`);
};

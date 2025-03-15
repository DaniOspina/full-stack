package com.prueba.backend.service;

import com.prueba.backend.model.Personaje;
import com.prueba.backend.exception.ResourceNotFoundException;
import com.prueba.backend.exception.BadRequestException;
import com.prueba.backend.repository.IPersonajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonajeService {

    private final IPersonajeRepository personajeRepository;

    public PersonajeService(IPersonajeRepository personajeRepository) {
        this.personajeRepository = personajeRepository;
    }

    @Cacheable(value = "personajes", key = "#orden")
    public List<Personaje> obtenerPersonajesOrdenados(String orden) {
        Sort sort;
        if ("nombre".equalsIgnoreCase(orden)) {
            sort = Sort.by("nombre").ascending();
        } else if ("fecha".equalsIgnoreCase(orden)) {
            sort = Sort.by("fechaCreacion").descending();
        } else {
            sort = Sort.by("id").descending(); // Orden por defecto
        }
        return personajeRepository.findAll(sort);
    }

    // Obtener un personaje por ID
    @Cacheable(value = "personaje", key = "#id")
    public Personaje obtenerPorId(Long id) {
        return personajeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Personaje con ID " + id + " no encontrado."));
    }

    // Guardar un personaje
    @CachePut(value = "personaje", key = "#result.id")
    @CacheEvict(value = "personajes", allEntries = true) // Limpia la lista en caché
    public Personaje guardarPersonaje(Personaje personaje) {
        if (personaje.getNombre() == null || personaje.getNombre().trim().isEmpty()) {
            throw new BadRequestException("El nombre del personaje no puede estar vacío.");
        }
        return personajeRepository.save(personaje);
    }

    // Actualizar un personaje existente
    @CachePut(value = "personaje", key = "#id") // Actualiza la caché del personaje individual
    @CacheEvict(value = "personajes", allEntries = true)
    public Optional<Personaje> actualizar(Long id, Personaje personajeActualizado) {
        return personajeRepository.findById(id).map(personaje -> {
            personaje.setNombre(personajeActualizado.getNombre());
            personaje.setIdentificacion(personajeActualizado.getIdentificacion());
            personaje.setImagenUrl(personajeActualizado.getImagenUrl());
            personaje.setRol(personajeActualizado.getRol());
            personaje.setDescripcion(personajeActualizado.getDescripcion());
            return personajeRepository.save(personaje);
        });
    }

    // Eliminar un personaje
    @Caching(evict = {
            @CacheEvict(value = "personaje", key = "#id"), //Borra el personaje individual del caché
            @CacheEvict(value = "personajes", allEntries = true) //Borra la lista completa del caché
    })
    public void eliminar(Long id) {
        if (!personajeRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se puede eliminar: el personaje con ID " + id + " no existe.");
        }
        personajeRepository.deleteById(id);
    }
}

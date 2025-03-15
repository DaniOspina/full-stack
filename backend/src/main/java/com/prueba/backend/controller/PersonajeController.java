package com.prueba.backend.controller;

import com.prueba.backend.model.Personaje;
import com.prueba.backend.service.PersonajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personajes")
@CrossOrigin(origins = "*") // Permite llamadas desde el frontend
public class PersonajeController {

    @Autowired
    private PersonajeService personajeService;

    @GetMapping
    public ResponseEntity<List<Personaje>> obtenerPersonajes(@RequestParam(defaultValue = "id") String orden) {
        return ResponseEntity.ok(personajeService.obtenerPersonajesOrdenados(orden));
    }

    // Obtener un personaje por ID
    @GetMapping("/{id}")
    public ResponseEntity<Personaje> obtenerPorId(@PathVariable Long id) {
        Personaje personaje = personajeService.obtenerPorId(id);
        return ResponseEntity.ok(personaje);
    }

    // Crear un nuevo personaje
    @PostMapping
    public Personaje crear(@RequestBody Personaje personaje) {
        return personajeService.guardarPersonaje(personaje);
    }

    // Actualizar un personaje existente
    @PutMapping("/{id}")
    public ResponseEntity<Personaje> actualizar(@PathVariable Long id, @RequestBody Personaje personajeActualizado) {
        return personajeService.actualizar(id, personajeActualizado)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un personaje
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        personajeService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}

package com.prueba.backend.repository;

import com.prueba.backend.model.Personaje;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPersonajeRepository extends JpaRepository<Personaje, Long> {
    List<Personaje> findAll(Sort sort);
}


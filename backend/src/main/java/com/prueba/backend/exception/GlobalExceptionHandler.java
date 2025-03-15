package com.prueba.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Manejar error cuando no se encuentra un recurso (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> manejarRecursoNoEncontrado(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("{ \"error\": \"" + ex.getMessage() + "\" }"); // Devuelve JSON con mensaje
    }

    // Manejar errores de solicitud incorrecta (400)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> manejarBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("{ \"error\": \"" + ex.getMessage() + "\" }");
    }

    // Manejar cualquier otro error inesperado (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> manejarExcepcionGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{ \"error\": \"Error interno del servidor: " + ex.getMessage() + "\" }");
    }
}
### **Gestión de Personajes**  

## **Descripción**  
Este proyecto permite gestionar los personajes de la película *The Dark Knight*, permitiendo crear, ver, editar y eliminar personajes. La aplicación incluye una interfaz moderna con **React y Tailwind CSS**, y un backend optimizado con **Spring Boot y MySQL**.  

---

## **Tecnologías Utilizadas**  

### **Frontend**  
- React.js (Vite)  
- Tailwind CSS  
- SweetAlert2  
- Axios  

### **Backend**  
- Java 17 (Spring Boot)  
- MySQL  
- Spring Data JPA  
- Spring Cache  

---

## **Instalación y Ejecución**  

### **Requisitos Previos**  
- Node.js 16+  
- Java 17+  
- MySQL 8+  
- Maven  

---

### **1. Instalación del Backend**  

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/DaniOspina/full-stack
   cd backend
   ```

2. **Configurar la base de datos**  
   Editar el archivo `application.properties` en `src/main/resources/`  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/personajes_db?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=admin
   ```

3. **Ejecutar el backend**  

El backend estará disponible en:  
```
http://localhost:8080/api/personajes
```

---

### **2. Instalación del Frontend**  

1. **Ir a la carpeta del frontend**  
   ```bash
   cd ../frontend
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Ejecutar el frontend**  
   ```bash
   npm run dev
   ```

El frontend estará disponible en:  
```
http://localhost:5173
```

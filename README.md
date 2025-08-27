# 📘 PROYECTO JAVASCRIPT LMS – TEACH MODERN

Este proyecto consiste en el desarrollo de una *plataforma LMS (Learning Management System), pensada para la **gestión educativa digital*, permitiendo a administradores, profesores y estudiantes interactuar en un entorno centralizado, accesible y moderno.  

El sistema se inspira visualmente en el dashboard de referencia:  
👉 [https://astounding-clafoutis-196412.netlify.app](https://astounding-clafoutis-196412.netlify.app/)  

El objetivo es ofrecer una plataforma funcional y escalable para la *gestión de cursos, estudiantes, profesores, evaluaciones y contenidos*.  

---

## 🚀 Alcance del Proyecto  

El sistema LMS desarrollado permite:  

- 📊 *Dashboard centralizado:* con estadísticas generales y accesos rápidos.  
- 📚 *Gestión de cursos:* creación, edición, listado y visualización de cursos con información detallada (nombre, descripción, duración, módulos, etc.).  
- 👨‍🏫 *Gestión de profesores:* visualización y administración de docentes asignados a cursos.  
- 👨‍🎓 *Gestión de estudiantes:* listado de estudiantes, con información de perfil, cursos inscritos y progreso.  
- 📝 *Tareas y evaluaciones:* administración de tareas por curso, con opción de entrega por parte del estudiante.  
- 🎯 *Notas y calificaciones:* los estudiantes pueden consultar sus notas y retroalimentación.  
- 🔐 *Roles diferenciados:*  
  - *Administrador:* controla cursos, usuarios y datos generales.  
  - *Profesor:* visualiza su carga académica y cursos asignados.  
  - *Estudiante:* accede a sus cursos, tareas y calificaciones.  

---

## 🛠 Tecnologías Usadas  

- *Frontend:* HTML5, CSS3, JavaScript  
- *Backend simulado:* [MockAPI](https://mockapi.io/)  
- *Persistencia local:* localStorage para mantener la sesión activa  

---

## 🔗 APIs utilizadas  

El sistema consume dos endpoints principales en MockAPI:  

- *Usuarios (login):*  
https://68a74769639c6a54e9a1952a.mockapi.io/api/login/login

markdown
Copiar código

- *Cursos:*  
https://68a66b9c639c6a54e99eb79c.mockapi.io/api/cursos/cursos

markdown
Copiar código

---

## 👥 Usuarios de Prueba  

Ejemplos de credenciales para login según roles:  

### 🔑 Estudiantes  
- *user:* anamartinez
- *password:* Ana2025*

### 👨‍🏫 Profesores  
- *user:* mtorres
- *password:* Miguel*123

### 👨‍💼 Administradores  
- *user:* prueba
- *password:* 123  


(Estos usuarios están creados en la API MockAPI y pueden modificarse desde el panel de administración o el JSON-Server local).  

---

## 📊 Funcionamiento del Sistema  

El proyecto se organiza en diferentes vistas HTML que se conectan dinámicamente con *MockAPI* para obtener información real de *usuarios, cursos y tareas*.  

### 🔐 Inicio de sesión  
- El usuario accede con credenciales (usuario y contraseña).  
- Dependiendo del rol, se redirige al *dashboard de estudiante, **profesor* o *administrador*.  
- La sesión se mantiene activa con localStorage.  

### 🎓 Vista del Estudiante  
- Acceso a sus cursos activos.  
- Visualización de los módulos, lecciones y materiales de cada curso.  
- Gestión de *tareas pendientes y entregadas* mediante ventanas emergentes (popups).  
- Consulta de calificaciones y notas de retroalimentación.  
- Acceso a información de perfil y progreso académico.  

### 👨‍🏫 Vista del Profesor  
- Visualización de cursos asignados.  
- Acceso a la lista de estudiantes en cada curso.  
- Gestión básica de tareas y evaluaciones.  
- Herramientas para dar seguimiento a la participación de los estudiantes.  

### 👨‍💼 Vista del Administrador  
- Panel con estadísticas globales (cursos, estudiantes, profesores, tareas).  
- Creación, edición y eliminación de cursos.  
- Registro de nuevos usuarios (profesores y estudiantes).  
- Administración de tareas en cada curso.  
- Monitoreo general de la plataforma y su contenido.  

---

## 🎨 Interfaz y Estilo  

- La interfaz está inspirada en un *dashboard moderno y minimalista*, con menús laterales y tarjetas informativas.  
- Uso de estilos personalizados en CSS para uniformidad visual.  

---

## 📄 Resumen del Funcionamiento Global  

El *LMS* integra todos los roles en un solo sistema:  

- Los *estudiantes* pueden aprender, entregar tareas y consultar calificaciones.  
- Los *administradores* tienen control total sobre los cursos, usuarios y evaluaciones.  

La comunicación con la API asegura que los datos se mantengan actualizados, mientras que el uso de localStorage garantiza la persistencia de la sesión en el navegador.  

---

## 👨‍💻 Autores  

- *Alejandro Andrés Sánchez Carrillo*  
- *David Santiago Carrillo Cardozo*  

---

## 🎥 Video Explicativo  

👉 [Ver video explicativo del proyecto](https://youtu.be/vDRGMCcQAgA)  

  

---

## 🌐 GitHub Pages – Demo en Vivo  

👉 [Abrir el proyecto en GitHub Pages](https://david-cardozo.github.io/Proyecto_JavaScript_AlejandroCarrillo_DavidCarrillo/webHTML/inicioLogin.html)
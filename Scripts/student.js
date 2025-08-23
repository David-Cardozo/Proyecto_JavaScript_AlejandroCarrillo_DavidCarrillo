document.addEventListener("DOMContentLoaded", async function() {
    const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
    if (usuarioactual === null) {
        window.location.href = '../webHTML/inicioLogin.html';
        return;
    }
    async function fetchDataCursos() {
        const res = await fetch('https://68a66b9c639c6a54e99eb79c.mockapi.io/api/cursos/cursos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        let data2 = await res.json();
        return data2;
    }
    async function mostrarcursos() {
        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
        const data2 = await fetchDataCursos();
        let cursos = [];
        cursosActivos=[];
        if (usuarioactual && usuarioactual.cursos && usuarioactual.cursos.length > 0) {
            data2.forEach(i => {
                if (i.id && usuarioactual.cursos.includes(i.id)) {
                    cursos.push(i); 
                }
            });
        }
        cursos = cursos.slice(0, 3);
        console.log(cursos)
            cursos.forEach(i=>{
                if (i.estatus ==="activo"){
                    cursosActivos.push(i);
                }
                });
            
            const cajacurso=document.getElementById(`activosN`);
                cajacurso.innerHTML= cursosActivos.length;

            

        
        const cursodiv =document.querySelector(`.cursosActivos`)
        cursos.forEach(curso => {
            cursodiv.innerHTML += `
            <div class="cursoN">
                <div class="imagencurso"> 
                    <img src="${curso.imagen}" alt="">
                </div>
                <div class="tituloCurso">${curso.nombre}</div>
                <div class="linea"></div>
                <div class="descripcion">
                    <div class="profesor">Profesor: ${curso.profesores}</div>
                    <div class="tiempo">Tiempo: ${curso.duracion} horas</div>
                </div>
                <div class="linea"></div>
                <div class="botonesCursos">
                    <button class="botonverde">Tareas</button>
                    <button class="botonblanco">Más...</button>
                </div>
            </div>`
            
        });
    
        return cursos
        
    }
    async function cursostotales() {
        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
        const data2 = await fetchDataCursos();
        let cursos = [];
        if (usuarioactual && usuarioactual.cursos && usuarioactual.cursos.length > 0) {
            data2.forEach(i => {
                if (i.id && usuarioactual.cursos.includes(i.id)) {
                    cursos.push(i); 
                }
            });
        }
        const cursodiv =document.querySelector(`.cursosDisponibles`)
        cursos.forEach(curso => {
            cursodiv.innerHTML += 
        `<div class="cursoN">
                <div class="imagencurso"> <img src="${curso.imagen}" alt=""></div>
                <div class="tituloCurso">${curso.nombre}</div>
                <div class="linea"></div>
                <div class="descripcion">${curso.descripcion}</div>
                <div class="linea"></div>
                <div class="botonesCursos">
                    <button class="botonverde">Ver</button>
                    <button class="botonblanco">mas...</button>
                </div>

            </div>`
        })
    }
    if (window.location.pathname.includes("studentDashboard.html")){
        await mostrarcursos();
    }
    if (window.location.pathname.includes("cursosStudents.html")) {
        await cursostotales();  
    }
    
});

// comentario para arregñar bug en hithub de commit 
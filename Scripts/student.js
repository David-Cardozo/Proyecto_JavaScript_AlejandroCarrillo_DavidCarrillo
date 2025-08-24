document.addEventListener("DOMContentLoaded", async function () {
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
        cursosActivos = [];
        if (usuarioactual && usuarioactual.cursos && usuarioactual.cursos.length > 0) {
            data2.forEach(i => {
                if (i.id && usuarioactual.cursos.includes(i.id)) {
                    cursos.push(i);
                }
            });
        }
        cursos = cursos.slice(0, 3);
        console.log(cursos)
        cursos.forEach(i => {
            if (i.estatus === "activo") {
                cursosActivos.push(i);
            }
        });

        const cajacurso = document.getElementById(`activosN`);
        cajacurso.innerHTML = cursosActivos.length;




        const cursodiv = document.querySelector(`.cursosActivos`)
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
        const cursodiv = document.querySelector(`.cursosDisponibles`)
        cursos.forEach(curso => {
            cursodiv.innerHTML +=

                `
        <div class="carta">
            <div class="contenedor">
                <div class="cursoN">
                    <div class="imagencurso">
                        <img src="${curso.imagen}" alt="">
                    </div>
                    <div class="tituloCurso">${curso.nombre}</div>
                    <div class="linea"></div>
                    <div class="descripcion">${curso.descripcion}</div>
                    <div class="linea"></div>
                    <div class="botonesCursos">
                        <button class="botonverde">Ver</button>
                        <button class="botonblanco">Más...</button>
                    </div>
                </div>

                <div class="cartaNAtras">
                    <div class="tituloCurso">${curso.nombre}</div>
                    <div class="linea"></div>
                    <div class="descripcion">${curso.descripcion}</div>
                    <div class="linea"></div>
                    <div class="botonesCursos">
                        <button class="botonblanco">Ocultar</button>
                    </div>
                </div>
            </div>
        </div>
        `

        });
        return cursos
    }
    async function mostrarTareas() {
        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
        const cursosTodos = await fetchDataCursos();
        const cursosUsuario = cursosTodos.filter(curso =>
            usuarioactual.cursos.includes(curso.id)
        );

        const contenedor = document.querySelector('.contenido');

        cursosUsuario.forEach(curso => {
            const tareasCurso = curso.tareas;

            const pendientes = [];
            const terminadas = [];

            tareasCurso.forEach(tarea => {
                const tareaUsuario = usuarioactual.tareas?.find(t =>
                    (t.cursoId === curso.id) && (t.idTarea === tarea.id)
                );

                if (tareaUsuario && tareaUsuario.estado === "terminado") {
                    terminadas.push(tarea);
                } else {
                    pendientes.push(tarea);
                }
            });

            let pendientesHTML = '';
            pendientes.forEach(t => {
                pendientesHTML += `
        <button class="botonTarea">
            <img src="../Images/tareas.svg" alt=""> ${curso.nombre} - ${t.titulo}
        </button>
    `;
            });

            let terminadasHTML = '';
            terminadas.forEach(t => {
                terminadasHTML += `
        <button class="botonTarea">
            <img src="../Images/tareas.svg" alt=""> ${curso.nombre} - ${t.titulo}
        </button>
    `;
            });

            contenedor.innerHTML += `
    <div class="tareasCurso">
        <div class="titulo2">${curso.nombre}</div>
        <div class="estado">
            <div class="pendientes">
                <div class="tituloEstado">Pendientes</div>
                ${pendientesHTML}
            </div>
            <div class="terminado">
                <div class="tituloEstado">Terminadas</div>
                ${terminadasHTML}
            </div>
        </div>
    </div>
    `;
        });
    }


    if (window.location.pathname.includes("studentDashboard.html")) {
        await mostrarcursos();
    }
    if (window.location.pathname.includes("cursosStudents.html")) {
        await cursostotales();
    }
    if (window.location.pathname.includes("tareasStudents.html")) {
        await mostrarTareas();
    }

});
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('botonblanco')) {  
        const cartaPadre = e.target.closest('.carta');
        cartaPadre.classList.toggle('flip');  
    }
});
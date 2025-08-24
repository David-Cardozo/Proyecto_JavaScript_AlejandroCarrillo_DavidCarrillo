document.addEventListener("DOMContentLoaded", async function () {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioactual'));

    if (usuarioActual === null) {
        window.location.href = '../webHTML/inicioLogin.html';
        return;
    }

    async function fetchDataCurses() {
        const res = await fetch('https://68a66b9c639c6a54e99eb79c.mockapi.io/api/cursos/cursos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let adminCursos = await res.json();
        return adminCursos;
    }

    async function allCurses() {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioactual'));
        const data = await fetchDataCurses();
        let cursos = [];

        data.forEach(i => {
            cursos.push(i);
        })

        const divCurse = document.querySelector(`.cursosDisponibles`);
        cursos.forEach(curso => {
            divCurse.innerHTML += `
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
                        <button class="botonverde">Editar</button>
                        <button class="botonblanco">Eliminar</button>
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

        return cursos;

    }

    async function allTask() {
        const cursosTodos = await fetchDataCurses();
        const contenedor = document.querySelector('.contenido');
        contenedor.innerHTML = '';

        cursosTodos.forEach(curso => {
            const tareasCurso = curso.tareas;

            let tareasHTML = '';

            tareasCurso.forEach(tarea => {
                tareasHTML += `
                <button class="botonTarea">
                    <img src="../Images/tareas.svg" alt="">
                    <strong>${curso.nombre}</strong> - ${tarea.titulo}
                </button>
            `;
            });

            contenedor.innerHTML += `
            <div class="tareasCurso">
                <div class="titulo2">${curso.nombre}</div>
                <div class="tareasLista">
                    ${tareasHTML}
                </div>
            </div>
        `;
        });
    }

    if (window.location.pathname.includes("adminCurses.html")) {
        await allCurses();
    }
    if(window.location.pathname.includes("adminTareas.html")) {
        await allTask();
    }

});


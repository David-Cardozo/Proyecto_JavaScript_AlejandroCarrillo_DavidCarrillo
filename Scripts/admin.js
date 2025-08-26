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

    async function fetchDataLogin() {
        const res = await fetch('https://68a74769639c6a54e9a1952a.mockapi.io/api/login/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let adminLogin = await res.json();
        return adminLogin;
    }

    async function allCurses() {
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

    async function showStudents() {
        const usuarios = await fetchDataLogin();
        const cursos = await fetchDataCurses();

        const contenedor = document.querySelector(".cursosDisponibles");

        const estudiantes = usuarios.filter(usuario => usuario.type === "Estudiante");

        estudiantes.forEach(estudiante => {

            const nombresCursos = estudiante.cursos.map(idCurso => {
                const cursoEncontrado = cursos.find(curso => curso.id == idCurso);
                return cursoEncontrado ? cursoEncontrado.nombre : "Curso no encontrado";
            });

            contenedor.innerHTML += `
            <div class="carta">
            <div class="contenedor">
                <div class="cursoN">
                    <div class="imagencurso">
                        <img src="../Images/studentIcon.png" alt="">
                    </div>
                    <div class="tituloCurso">${estudiante.name}</div>
                    <div class="linea"></div>
                    <div class="descripcion">Cursos: ${nombresCursos.join(', ')}</div>
                    <div class="linea"></div>
                    <div class="botonesCursos">
                        <button class="botonverde">Editar</button>
                        <button class="botonblanco">Eliminar</button>
                    </div>
                </div>
        </div>

        `;
        })
    }

    async function showProfessors() {
        const usuarios = await fetchDataLogin();
        const cursos = await fetchDataCurses();

        const contenedor = document.querySelector(".cursosDisponibles");

        const profesores = usuarios.filter(usuario => usuario.type === "Profesor");

        profesores.forEach(profesor => {

            const nombresCursos = profesor.cursos.map(idCurso => {
                const cursoEncontrado = cursos.find(curso => curso.id == idCurso);
                return cursoEncontrado ? cursoEncontrado.nombre : "Curso no encontrado";
            });

            contenedor.innerHTML += `
            <div class="carta">
            <div class="contenedor">
                <div class="cursoN">
                    <div class="imagencurso">
                        <img src="../Images/studentIcon.png" alt="">
                    </div>
                    <div class="tituloCurso">${profesor.name}</div>
                    <div class="linea"></div>
                    <div class="descripcion">Cursos: ${nombresCursos.join(', ')}</div>
                    <div class="linea"></div>
                    <div class="botonesCursos">
                        <button class="botonverde">Editar</button>
                        <button class="botonblanco">Eliminar</button>
                    </div>
                </div>
        </div>

        `;

        })
    }

    async function adminDashboard() {
        const usuarios = await fetchDataLogin();
        const cursos = await fetchDataCurses();
        const container = document.querySelector(`.cursosActivos`);

        const profesores = usuarios.filter(usuario => usuario.type === "Profesor");
        const estudiantes = usuarios.filter(usuario => usuario.type === "Estudiante");

        container.innerHTML = "";

        const curso = cursos[0];
        const profesor = profesores[0];
        const estudiante = estudiantes[0];

        container.innerHTML = `
    <div>
    <h1 class="titleCard">Cursos</h1>
    <div class="card">
        <div class="imagencurso"><img src="${curso["imagen"]}" alt=""></div>
        <div class="tituloCurso">${curso["nombre"]}</div>
        <div class="linea"></div>
        <div class="linea"></div>
        <div class="botonesCursos">
            <a href="../webHTML/adminCurses.html"><button class="botonverde">+ Ver todos</button></a>
        </div>
    </div>
    </div>

    <div>
    <h1 class="titleCard">Profesores</h1>
    <div class="card">
        <div class="imagencurso"><img src="../Images/professorIcon.svg" alt=""></div>
        <div class="tituloCurso">${profesor["name"]}</div>
        <div class="linea"></div>
        <div class="linea"></div>
        <div class="botonesCursos">
            <a href="../webHTML/adminProfessors.html"><button class="botonverde">+ Ver todos</button></a>
        </div>
    </div>
    </div>

    <div>
    <h1 class="titleCard">Estudiantes</h1>
    <div class="card">
        <div class="imagencurso"><img src="../Images/studentIcon.png" alt=""></div>
        <div class="tituloCurso">${estudiante["name"]}</div>
        <div class="linea"></div>
        <div class="linea"></div>
        <div class="botonesCursos">
            <a href="../webHTML/adminStudents.html"><button class="botonverde">+ Ver todos</button></a>
        </div>
    </div>
    </div>
    `;
    }

    
    async function loadCursesForm(){
        const dataCursos = await fetchDataCurses();
        const printCurses = document.getElementById('printCurses');
        printCurses.innerHTML = ``;
        
        dataCursos.forEach(i => {
            nombreCurso = i.nombre;
            idCurso = i.id;
            printCurses.innerHTML += `
            <div class="cursos">
                    <input type="checkbox" class="seleccionCursos" id="curso${idCurso}" data-id-Guia="${idCurso}"/>
                    <label for="curso${idCurso}">${nombreCurso}</label>
            </div>
        `;
        })
    }
    

    async function ingresarUser() {
        const usuario = document.getElementById('usuario').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const nombreC = document.getElementById('nombreC').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        let tipoUsuario = document.getElementById('type').value.trim();
        tipoUsuario = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1); 
        const dataCurses = await fetchDataCurses();  
        const tareaxCurso = dataCurses.tareas;

        const checks = document.querySelectorAll('.seleccionCursos');
        const cursosElegidos = []   

        checks.forEach(a => {
            if (a.checked) {
                cursosElegidos.push(Number(a.dataset.idGuia)); 
            }
        });


        console.log(cursosElegidos);

        

        const nuevoUsuario = {
            name: nombreC,
            telefono: telefono,
            email: correo,
            password: pass,
            user: usuario,
            type: tipoUsuario,
            cursos: cursosElegidos,
            tareas: []
        };

        const newData = await fetch('https://68a74769639c6a54e9a1952a.mockapi.io/api/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        });

        if (newData.ok) {
            alert('Usuario creado Correctamente')
        }

    }


    if (window.location.pathname.includes("adminCurses.html")) {
        await allCurses();
    }
    if (window.location.pathname.includes("adminTareas.html")) {
        await allTask();
    }
    if (window.location.pathname.includes("adminStudents.html")) {
        await showStudents();
    }
    if (window.location.pathname.includes("adminProfessors.html")) {
        await showProfessors();
    }
    if (window.location.pathname.includes("adminDashboard.html")) {
        await adminDashboard();
    }
    if (window.location.pathname.includes("adminNewperfil.html")) {
        await loadCursesForm();
    }

    const anadir = document.getElementById('enlace');
    anadir.addEventListener('click', function (event) {
        ingresarUser();
    });
});


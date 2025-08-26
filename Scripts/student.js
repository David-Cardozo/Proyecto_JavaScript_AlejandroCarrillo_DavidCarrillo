let cursos = [];
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
        cursos = [];
        let cursosActivos = [];
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
            <div class="carta">
            <div class="contenedor">
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
                        <a href="../webHTML/tareasStudents.html">
                            <button class="botonverde">Tareas</button>
                        </a>
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

    async function cursostotales() {
        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
        const data2 = await fetchDataCursos();
        cursos = [];
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
                        <button class="botonverde" dataId="${curso.id}">Ver</button>
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
                const tareaUsuario = usuarioactual.tareas.find(t =>
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
        <button class="botonTarea" 
        cursoidPopup=${curso.id}" 
        idPopup="${t.id}" 
        tituloPopup="${t.titulo}" 
        descripcionpopup="${t.descripcion}">
            <img src="../Images/tareas.svg" alt=""> ${curso.nombre} - ${t.titulo}
        </button>
    `;
            });

            let terminadasHTML = '';
            terminadas.forEach(t => {
                terminadasHTML += `
        <button class="botonTarea" 
        cursoidPopup=${curso.id}" 
        idPopup="${t.id}" 
        tituloPopup="${t.titulo}" 
        descripcionpopup="${t.descripcion}">
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
    async function mostrarDatos(){
        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));
        const nombreInput = document.querySelector(".nombreUsuario input");
    nombreInput.value = usuarioactual.name;

    const correoInput = document.querySelector(".correo input");
    correoInput.value = usuarioactual.email;

    const usuarioInput = document.querySelector(".namertag input");
    usuarioInput.value = usuarioactual.user;

    const telefonoInput = document.querySelector(".telefono input");
    telefonoInput.value = usuarioactual.telefono;

    const cedulaInput = document.querySelector(".cedula input");
    cedulaInput.value = usuarioactual.type;

    const passwordInput = document.querySelector(".contraseña input");
    passwordInput.value = usuarioactual.password;

    const nombreDiv = document.querySelector(".tituloPerfil .nombre");
    nombreDiv.textContent = usuarioactual.nombre;
    if(usuarioactual.type==='Estudiante'){
        const imgPerfil = document.querySelector(".imagenUsuario img");
        imgPerfil.src = "../Images/studentDashboard/studentIcon.png"
    }
    if(usuarioInput==='Profesor'){
        imgPerfil.src = "../Images/professorIco.webp"
    }
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
    if (window.location.pathname.includes("perfilStudent.html")){
        await mostrarDatos();
    }

});
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('botonblanco')) {
        const cartaPadre = e.target.closest('.carta');
        cartaPadre.classList.toggle('flip');
    }
});
const desaparecer = document.querySelector(`.contenido`);
const aparecer = document.querySelector(`.contenido2`);
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("botonverde")) {
    desaparecer.classList.remove("visible");
    desaparecer.classList.add("desaparecer");

    const idCurso = e.target.getAttribute("dataId");
    const curso = cursos.find((c) => c.id == idCurso);

    let temas = "";
    curso.temas.forEach((t) => {
      temas += `${t.id}. ${t.titulo}<br>`;
    });

    setTimeout(() => {
      aparecer.innerHTML = `
        <div class="atras"><button class="volverCursos"> ←Volver a cursos </button></div>
        <div class="ImagenGrande"><img src="${curso.imagen}" alt=""></div>
        <div class="titulo2">${curso.nombre} </div>
        <div class="frames">
          <div class="frame1">
            <div class="descripcion2">
              <div class="negrilla">Descripcion</div>
              ${curso.descripcion}
            </div>
            <div class="requisitos">
              <div class="negrilla">Requisitos</div>
              ${curso.requisitos}
            </div>
            <div class="estructura">
              <div class="negrilla">Estructura</div>
              ${curso.estructura}
            </div>
          </div>
          <div class="frame2">
            <div class="temasJs">
              <div class="negrilla">Temas</div>
              ${temas}
              <button class="verTemas" dataId2="${curso.id}">Ver</button>
            </div>
            <div class="notas"><button class="botonnotas" dataId="${curso.id}">Ver Notas</button></div>
          </div>
        </div>
      `;
      aparecer.classList.remove("desaparecer");
      aparecer.classList.add("visible");
      desaparecer.style.display = "none";
    }, 600);
  }

  if (e.target.classList.contains("volverCursos")) {
    contenido3.classList.remove("visible");
    contenido3.style.display = "none";
    contenido4.classList.remove("visable");
    contenido4.style.display="none";

    aparecer.classList.remove("visible");
    aparecer.classList.add("desaparecer");

    setTimeout(() => {
      desaparecer.style.display = "flex";
      desaparecer.classList.remove("desaparecer");
      desaparecer.classList.add("visible");
    }, 600);
  }
});
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("botonTarea")) {
        const titulo = e.target.getAttribute("tituloPopup");
        const descripcion = e.target.getAttribute("descripcionPopup");

        const overlay = document.querySelector(".overlay");
        const popup = overlay.querySelector(".tareaCompleta");

        overlay.style.display = "flex";

        popup.querySelector(".titulopopup").innerHTML = `
            <span>${titulo}</span>
            <div class="cerrar"><img src="../Images/atras.svg" alt=""></div>
        `;
        popup.querySelector(".descripcionpopup").innerHTML = `
            <p>${descripcion}</p>
            <div class="subirTarea">
            <label for="link">Tu trabajo (link):</label> <br>
            <input type="url" id="link" placeholder="https://..." class="inputLink">
            <div class="envia"><button class="enviarTarea">Enviar</button></div>
            </div>
        `;
    }

    if (e.target.closest(".cerrar") || e.target.classList.contains("overlay")) {
        document.querySelector(".overlay").style.display = "none";
    }
});

const contenido3=document.querySelector(`.contenido3`)
document.addEventListener("click", function (a){
    if (a.target.classList.contains("verTemas")){
        aparecer.classList.remove("visible");
        const idCurso = a.target.getAttribute("dataId2");
        const curso = cursos.find((c) => c.id == idCurso);
        let botonestemas = "";
        curso.temas.forEach((t) => {
            botonestemas += `
                <button class="botonTemas" contenidoTema="${t.contenido}">
                    ${t.id}. ${t.titulo}
                </button>
            `;
        });
        contenido3.innerHTML=`
    <div class="atras"><button class="volverCursos"> ← Volver a cursos </button></div>
    <div class="desplegable">
        <div class="titulodetemas"><p>Temas del curso</p></div>
        <div class="division">
            <div class="temas">${botonestemas}</div>
            <div class="reflejardata"><p>Seleccione un tema para comenzar a aprender  <br><span>
                Elija un tema de la barra lateral para comenzar a ver el contenido del curso.</span></p>
            </div>
        </div>
        </div>
        
        `
    contenido3.style.display = "flex";
    contenido3.classList.add("visible"); 
    }
})
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("botonTemas")) {
        const contenido = e.target.getAttribute("contenidoTema");
        const reflejardata = document.querySelector(".reflejardata");
        if (reflejardata && contenido) {
            reflejardata.innerHTML = `
                <div class="cuadro">${contenido}</div>
            `;
        }
    }
});
const contenido4 = document.querySelector(`.contenido4`);
document.addEventListener("click", function (a) {
    if (a.target.classList.contains("botonnotas")) {
        aparecer.classList.remove("visible");
        contenido4.style.display="flex"

        const usuarioactual = JSON.parse(localStorage.getItem('usuarioactual'));

        const idCurso = a.target.getAttribute("dataId");
        const cursoactual = cursos.find(c => c.id == idCurso);
        usuarioactual.tareas.find(tarea => tarea.cursoId === cursoactual.id)
        let calificaciones="";
        let tareasHTML = "";
        if (cursoactual.tareas && cursoactual.tareas.length > 0) {
            cursoactual.tareas.forEach(tarea => {
                
                tareasHTML += `
                    <div class="tarea">
                        <button>
                        <img src="../Images/tareas.svg" alt="">
                        <h4>${tarea.titulo}</h4>-
                        <p>${tarea.descripcion}</p>
                        </button>
                    </div>
                `;
                const notaTarea = usuarioactual.tareas.find(
                    t => t.cursoId == cursoactual.id && t.idTarea == tarea.id
                );

                let notaactual = "";
                if (notaTarea) {
                    notaactual = notaTarea.nota;  
                } 
                else {
                    notaactual = "";  
                }

                calificaciones += `
                    <button>Calificación: ${notaactual}</button>
                `;
            });
        }
        const nombre = usuarioactual.name;
        let imgPerfil = "";
        if (usuarioactual.type === "Estudiante") {
            imgPerfil = "../Images/studentDashboard/studentIcon.png";
        }

        contenido4.innerHTML = `
        <div class="atras">
            <button class="volverCursos"> ← Volver a cursos </button>
        </div>

        <div class="cuadrox">
            <img src="${imgPerfil}" alt="" class="imagenNota">
            <p class="nombrenota">${nombre}</p>
        </div>

        <div class="cuadro2">
            <div class="cuadrito">
                <div class="titulonota"><h2>${cursoactual.nombre}</h2></div>
                <div class="cuadro3">
                    ${tareasHTML}
                </div>
            </div>
            <div class="cuadro4">
                <div><p>Calificación (de 1 a 100)</p></div>
                <div class="nota"> ${calificaciones}</div>
            </div>
        </div>
        `;
    }
});

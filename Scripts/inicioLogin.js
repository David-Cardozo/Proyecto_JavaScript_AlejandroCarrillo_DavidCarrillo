async function fetchDataUsuarios() {
    const res = await fetch('https://68a74769639c6a54e9a1952a.mockapi.io/api/login/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await res.json();
    return data;
}

async function login() {
    const userInput = document.getElementById('usuario').value.trim();
    const passInput = document.getElementById('pass').value.trim();
    
    const data = await fetchDataUsuarios();
        data.forEach(i => {
            if (i.user === userInput && i.password === passInput) {
                usuarioactual=i
                
            }
        });
        if (usuarioactual) {
            localStorage.setItem('usuarioactual', JSON.stringify(usuarioactual));
            if (usuarioactual.type === 'Estudiante') {
            } else if (usuarioactual.type === 'Profesor') {
                window.location.href = '../webHTML/professorDashboard.html';
            } else if (usuarioactual.type === 'Admin') {
                window.location.href = '../webHTML/adminDashboard.html';
            }
            
            
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    
    return usuarioactual;
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
    
    if (usuarioactual && usuarioactual.cursos && usuarioactual.cursos.length > 0) {
        data2.forEach(i => {
            if (i.id && usuarioactual.cursos.includes(i.id)) {
                cursos.push(i); 
            }
        });
    }
    
    console.log(cursos)
    const cursodiv =document.querySelector(`.cursosActivos`)
    if (!cursodiv) {
        console.log("No se encontró el contenedor para los cursos.");
        return;
    }
    cursodiv.innerHTML = '';
    cursos.forEach(curso => {
        cursodiv.innerHTML += `
        <div class="cursoN">
            <div class="imagencurso"> 
                <img src="../Images/imagencurso.png" alt="">
            </div>
            <div class="tituloCurso">${curso.nombre}</div>
            <div class="linea"></div>
            <div class="descripcion">
                <div class="profesor">Profesor: ${curso.profesor}</div>
                <div class="tiempo">Tiempo: ${curso.tiempo} horas</div>
            </div>
            <div class="linea"></div>
            <div class="botonesCursos">
                <button class="botonverde">Tareas</button>
                <button class="botonblanco">Más...</button>
            </div>
        </div>;`
        
    });

    return cursos

}
async function ejecucionFunciones() {
    const usuarioactual = await login();

    if (usuarioactual) {
        mostrarcursos();
    }
}



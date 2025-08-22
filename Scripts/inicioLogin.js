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

function login() {
    const userInput = document.getElementById('usuario').value.trim();
    const passInput = document.getElementById('pass').value.trim();
    let user = "";
    let pass = "";
    let estado = "";

    fetchDataUsuarios().then(data => {
        data.forEach(i => {
            if (i.user === userInput && i.password === passInput) {
                usuarioactual=i
            }
        });
        if (usuarioactual) {
            const enlace = document.getElementById('enlace');
            if (usuarioactual.type === 'Estudiante') {
                enlace.href = '../webHTML/studentDashboard.html'; 
            } else if (usuarioactual.type === 'Profesor') {
                enlace.href = '../webHTML/professorDashboard.html'; 
            } else if (usuarioactual.type === 'Admin') {
                enlace.href = '../webHTML/adminDashboard.html'; 
            }
            
            enlace.click();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
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
async function mostrarcursos(data2,usuarioactual) {
   
}
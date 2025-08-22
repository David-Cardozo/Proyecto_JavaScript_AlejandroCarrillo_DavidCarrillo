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
    usuarioactual="";
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
    return usuarioactual;
}
    
async function mostrarcursos(usuarioactual) {
    const data2 = await fetchDataCursos();
    let cursos = [];
    let usuario= [];
    data2.forEach(i=>{
        if (usuarioactual.cursos=== data2.cursos.id){
            cursos.push(i);
        }
    });
    
    console.log(cursos);
    console.log("hola")
    return cursos

}
async function ejecucionFunciones() {
    const usuarioactual = await login();

    if (usuarioactual) {
        mostrarcursos(usuarioactual);
    }
}



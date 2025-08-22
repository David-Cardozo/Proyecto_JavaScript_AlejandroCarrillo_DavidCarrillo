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
                window.location.href = '../webHTML/studentDashboard.html';
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





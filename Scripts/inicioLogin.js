async function fetchData() {
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
    fetchData().then(data => {
        data.forEach(i => {
            if (i.user === userInput && i.password === passInput) {
                user = i.user;
                pass = i.password;
                estado = i.type;
            }
        });
        console.log("Datos de la API:", data);
        if (user && pass) {
            const enlace = document.getElementById('enlace');
            if (estado === 'Estudiante') {
                enlace.href = '../webHTML/studentDashboard.html'; 
            } else if (estado === 'Profesor') {
                enlace.href = '../webHTML/professorDashboard.html'; 
            } else if (estado === 'Admin') {
                enlace.href = '../webHTML/adminDashboard.html'; 
            }
            
            enlace.click();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
}

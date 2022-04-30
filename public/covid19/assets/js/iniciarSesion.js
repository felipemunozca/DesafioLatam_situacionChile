
let txtEmail = document.querySelector('#txtEmail');
let txtPassword = document.querySelector('#txtPassword');
const btnEntrar = document.querySelector('#btnEntrar');


btnEntrar.addEventListener('click', async () => {

    validarUsuario(txtEmail.value, txtPassword.value);

    limpiarFormulario();

});

const validarUsuario = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email, 
                    password: password 
                })
            })
        
        const { token } = await response.json();

        localStorage.setItem('llaveJwt', token);

        if (token) {
            alert('Has iniciado sesión correctamente');
            location.reload();
        } else {
            alert('Error al verificar los datos. Vuelva a ingresar su email y password.');
        }

    } catch (error) {
        console.error(error);
    }
};


const agregarYQuitarClases = () => {
    let token = localStorage.getItem('llaveJwt');

    if (token) {
        document.getElementById("btnLogin").className = "nav-link d-none";
        document.getElementById("btnSituacion").className = "nav-link d-block";
        document.getElementById("btnCerrar").className = "nav-link d-block";
    } else {
        console.log('No se puede cambiar el codigo html si no iniciado sesión.')
    }
}


const limpiarFormulario = () => {
    txtEmail.value = "";
    txtPassword.value = "";
};


( () => {

    agregarYQuitarClases();

}) ();
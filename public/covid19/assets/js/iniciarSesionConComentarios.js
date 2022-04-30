/* declaro las variables que rescatare desde el modal-login en el archivo index.html */
let txtEmail = document.querySelector('#txtEmail');
let txtPassword = document.querySelector('#txtPassword');
const btnEntrar = document.querySelector('#btnEntrar');

/* evento clic del boton Entrar del modal-login. */
btnEntrar.addEventListener('click', async () => {

    validarUsuario(txtEmail.value, txtPassword.value);

    limpiarFormulario();

});

const validarUsuario = async (email, password) => {
    try {
        const respuesta = await fetch('http://localhost:3000/api/login',
            {
                /* utilizo el metodo POST para preparar los datos a enviar (email y password) */
                /* con stringify tranformo el texto literal a un texto plano en formato json. */
                method: 'POST',
                body: JSON.stringify({ 
                
                /* el primer "email" es el título del atributo de una de las propiedades de la DB user.json */
                /* el segundo "email" es el parámetro que declare en esta función. */
                /* es lo mismo con password. */
                    email: email, 
                    password: password 
                })
            })
        
        /* la respuesta siempre tiene que pasar como .json() */
        /* Un token es un código alfanumérico que tiene caracteres tanto mayúsculas como minúsculas. */
        const { token } = await respuesta.json();
        console.log(token);

        /* el token queda almacenado en el localStorage o sessionStorage en el navegador. */
        /* en cada petición http que hagamos a nuestro servidor viajará en las cabeceras (header) */
        /* el método setItem() recibe una clave y un valor, añadirá estos al Storage, o actualizará el valor si la clave ya existe. */
        /* el formato para declararlo es: storage.setItem(keyName, keyValue) */
        localStorage.setItem('llaveJwt', token);
        
        /* condición if para comprobar si el valor de token es distinto de "null" o "undefined". */
        /* creo una sentencia if para comprobar si la variable token trae algún valor o si viene vacía. */
        /* si el email y password son correctos retorna el valor de token, si es incorrecto o esta vacio, retorna un mensaje. */
        if (token) {
            /* a set item le debo pasar dos valores: la key (llaveJwt) y el value (token). */
            /* creo un mensaje para darle interaccion y que no se note el reload */
            /* recargo la pagina para que tome los cambios al nav, asi aparecen algunas opciones y desaparecen otras. */
            localStorage.setItem('llaveJwt', token);
            alert('Has iniciado sesión correctamente');
            location.reload();
        } else {
            alert('Error al verificar los datos. Vuelva a ingresar su email y password.');
        }

    } catch (error) {
        console.error(error);
    }
};

/* funcion para agregar y quitar clases a los enlaces del nav aprovechando las clases de bootstrap. */
const agregarYQuitarClases = () => {

    /* paso a una variable el token que esta almacenado en el localStorage. */
    let token = localStorage.getItem('llaveJwt');

    /* si token tiene valor diferente a null o undefined es TRUE, osea se cumple la condicion. */
    /* para cambiar la clase de una etiqueta html, se debe escribir la clase tal cual esta en el archivo y luego hacer los cambios. */
    /* con d-none las etiquetas se ocultan y con d-block se vuelven visibles. */
    if (token) {
        document.getElementById("btnLogin").className = "nav-link d-none";
        document.getElementById("btnSituacion").className = "nav-link d-block";
        document.getElementById("btnCerrar").className = "nav-link d-block";
    } else {
        console.log('Error al intentar cambiar los estilos del formulario.')
    }
}

/* funcion para limpiar el formulario cada vez que se presione el boton Entrar. */
const limpiarFormulario = () => {
    txtEmail.value = "";
    txtPassword.value = "";
};


/* funcion anonima autoejecutable, es la encargada de levantar el programa */
/* inicia con la funcion agregarYQuitarClases() para revisar que enlaces del menu nav debe mostrar o ocultar, 
dependiendo si existe o no un token valido. */
( () => {

    agregarYQuitarClases();

}) ();
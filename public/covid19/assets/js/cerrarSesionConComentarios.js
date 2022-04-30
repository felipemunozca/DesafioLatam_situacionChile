/* declaro como variable el enlace que está en el menú "nav" que dice Cerrar sesión */
const btnCerrar = document.querySelector('#btnCerrar');

/* clear() método que al invocarlo, elimina o "limpia" todos los registros del almacén local (token). */
/* href propiedad que me permite redirigir la página a donde quiera, en este caso a la raíz del programa. */
btnCerrar.addEventListener('click', () => {
    localStorage.clear();
    location.href = './';
});
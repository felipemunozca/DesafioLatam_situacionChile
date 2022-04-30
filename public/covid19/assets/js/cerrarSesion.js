const btnCerrar = document.querySelector('#btnCerrar');

btnCerrar.addEventListener('click', () => {
    localStorage.clear();
    location.href = './';
});
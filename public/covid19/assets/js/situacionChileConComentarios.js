
/* funcion para obtener la informacion de los diferentes endpoints */
/* consulta es el parametro que recibe el nombre desde la funcion pasarValoresParaGraficar y lo agrega a la url.  */
const obtenerInformacionDeChile = async (consulta) => {
    try {

        /* paso a una variable el token que esta almacenado en el localStorage. */
        let token = localStorage.getItem('llaveJwt');

        const url = 'http://localhost:3000/api/' + consulta;
        
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })

        const data = await respuesta.json();

        /* creo un arreglo vacio para subirle los elementos de la API mediante push. */
        let datosRecibidos = [];

        /* el primer data es el declarado junto a respuesta que se convertira en json. */
        /* el segundo data es el nombre del objeto de la API donde se guarda toda la informacion. */
        data.data.forEach(elemento => {
            if (elemento.total > 0) {
                datosRecibidos.push({ label: elemento.date, y: elemento.total })
            }
        });

        /* retorno los datos recibidos, para poder recibirlos en la funcion construirGraficoChile. */
        return datosRecibidos;

    } catch (error) {
        console.log('Error al intentar obtener la información de casos en Chile.')
        console.error(error);
    }
}


/* funcion para imprimir en situacionChile.html el grafico de lineas. */
/* la funcion recibe 3 parametros, los cuales estan siendo enviados desde la funcion pasarValoresParaGraficar. */
const construirGraficoChile = (confirmados, fallecidos, recuperados) => {

    /* solo hago cambios esteticos, colores de las lineas, alineacion. */
    var chart = new CanvasJS.Chart("contenedorGraficoChile", {
	animationEnabled: true,
	title:{
		text: "Situacion Chile",
        padding: 10,
	}, 
	axisY:{
		title: ""
	},
	toolTip: {
		shared: true
	},
	legend:{
        verticalAlign: "top",
        fontSize: 14,
        padding: 10,
		cursor:"pointer",
		itemclick: toggleDataSeries
	},
	data: [{        
		type: "spline",  
		name: "Confirmados",
        color: "gold",
        legendMarkerColor: "gold",       
		showInLegend: true,
		dataPoints: confirmados
	},
    {        
        type: "spline",  
        name: "Fallecidos",
        color: "grey",
        legendMarkerColor: "grey",        
        showInLegend: true,
        dataPoints: fallecidos
    },
	{        
		type: "spline",
		name: "Recuperados",
        color: "turquoise",
        legendMarkerColor: "turquoise",
		showInLegend: true,
		dataPoints: recuperados
	}]
    });
    chart.render();

    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;            
        }
        chart.render();
    }

}

/* funcion para enviar los endpoints a la url de la API. */
/* ademas como respuesta, envia los valores en formato de arreglo de una una de las categorias. */
/* ya que estoy enviando 3 arreglos juntos, se debe contar desde el indice [0] */
const pasarValoresParaGraficar = () => {
    
    Promise.all( [obtenerInformacionDeChile('confirmed'), obtenerInformacionDeChile('deaths'), obtenerInformacionDeChile('recovered')] )
        .then((respuesta) => {
            construirGraficoChile(respuesta[0], respuesta[1], respuesta[2]);
        })
        .catch(error => {
            alert('Error al intentar enviar los valores al grafico.')
            console.error(error);
        });
    
};

/* funcion para validar si existe o no un token guardado en localStorage. */
/* si el valor de token es igual a null o undefined, mostrara un mensaje alert, y me redireccionara a la raiz del programa. */
/* en caso contrario, se ejecutara la funcion pasarValoresParaGraficar() para imprimir el grafico. */
const validarToken = () => {
    let token = localStorage.getItem('llaveJwt');

    if (!token) {
        alert('usted no tiene acceso a esta pagina')
        location.href = './';
    } else {
        pasarValoresParaGraficar();
    }
}


/* funcion anonima autoejecutable, es la encargada de levantar el programa */
/* inicia con la funcion validarToken() para comprobar si existe uno guardado en localStorage o no. */
( () => {

    validarToken();

}) ();
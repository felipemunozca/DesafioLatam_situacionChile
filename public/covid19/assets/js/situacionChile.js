
const obtenerInformacionDeChile = async (consulta) => {
    try {
        let token = localStorage.getItem('llaveJwt');

        const url = 'http://localhost:3000/api/' + consulta;
        
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })

        const data = await respuesta.json();

        let datosRecibidos = [];
        data.data.forEach(elemento => {
            if (elemento.total > 0) {
                datosRecibidos.push({ label: elemento.date, y: elemento.total })
            }
        });

        return datosRecibidos;

    } catch (error) {
        console.log('Error al intentar obtener la información de casos en Chile.')
        console.error(error);
    }
}


const construirGraficoChile = (confirmados, fallecidos, recuperados) => {

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


const validarToken = () => {
    let token = localStorage.getItem('llaveJwt');

    if (!token) {
        alert('usted no tiene acceso a esta pagina')
        location.href = './';
    } else {
        pasarValoresParaGraficar();
    }
}

( () => {
    
    validarToken();

}) ();
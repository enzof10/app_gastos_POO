const ingresos = [
    new Ingreso("algoa", 200.00),
    new Ingreso("venta coche", 1400)
];
// lo que ya no se puede modificar es la referencia que almacena esta variable
const egresos = [
    new Egreso("renta Dpto", 900),
    new Egreso("Ropa", 400)
];

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let calculoIngresos = () =>{
    let totalIngresos = 0;
    for( let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
};

let calculoEgresos = () => {
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () =>{
    let presupuesto =calculoIngresos() - calculoEgresos();
    let porcentajeEgreso = calculoEgresos()/calculoIngresos(); 
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML =formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML =formatoMoneda( calculoIngresos());
    document.getElementById("egresos").innerHTML =formatoMoneda( calculoEgresos());
}

const formatoMoneda = (valor) =>{
   return valor.toLocaleString ("en-US", {style:"currency", currency:"USD", minimunFractionDigitits:2});
}

const formatoPorcentaje  = (valor) => {
    // sintaxis de un objeto, atributo o valor y propiedad
    return valor.toLocaleString("en-US",{style:"percent", minimunFractionDigitits:2});
}

const cargarIngresos = ()=>{
    let ingresosHtml = "";
    for(let ingreso of ingresos){
        ingresosHtml += creaarIngresoHtml(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHtml;
}

const creaarIngresoHtml = (ingreso) =>{
    let ingresosHtml = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon>                            </button>
            </div>
        </div>
    </div>
    `;
    return ingresosHtml;

}

const cargarEgresos = () =>{
    let egresosHtml = "";
    for(let egreso of egresos){
        egresosHtml += creaarEgresoHtml(egreso); 
    }
    document.getElementById("lista-egresos").innerHTML = egresosHtml;
}

const creaarEgresoHtml = (egreso) =>{
    let egresoHtml = `
            <div class="elemento limpiarEstilos" >
                <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/calculoEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"  onclick="eliminarEgreso(${egreso.idEgreso})"></ion-icon>   
                            </button>
                    </div>
                </div>
            </div>
    `
    return egresoHtml;
}

const eliminarIngreso =(id)=>{
    // buscamos con el id el objeto dentro del arreglo
    // el metodo findindex devuelve la posicion de un objeto
    // se le pasas como parametro una funcion e itera al array
   let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.idIngreso === id) ;
    // for(let ingreso of ingresos) es como esto
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const eliminarEgreso = (id)=>{
    console.log("Entro egreso")
    let indiceEliminar = egresos.findIndex(egreso => egreso.idEgreso === id)

    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const agregarRegistro = () =>{
    let forma = document.getElementById("forma");
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    console.log(forma, tipo, descripcion, valor);

    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === "egreso"){
            console.log("entro egreso")
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
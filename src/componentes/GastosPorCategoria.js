import React from "react";
import ContenedorBtnSalir from './../elementos/BtnSalir';
import MenuNavegacion from "./MenuNavegacion";
import { Helmet } from "react-helmet";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMesPorCategoria from "../hooks/useObtenerGastosDelMesPorCategoria";
import { ContenedorLista, 
    Lista, 
    ListaElementos, 
    ListaElementosGastos, 
    FuenteListaCategorias
 } from "../elementos/ElementosDeLista";
 import IconosCategoria from "../elementos/IconosCategoria";
 import convertirAMoneda from './../funciones/ConvertirAMoneda';

const GastosPorCategoria = () => {
    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
    // console.log(gastosPorCategoria);

    return(
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>
            <ContenedorBtnSalir>
            <btnSalir />
            </ContenedorBtnSalir>
            <MenuNavegacion />
            <div className="contenedor-gastos-categoria">
                <h1>Gastos Por Categoría</h1>
            </div>
            <ContenedorLista>
            {gastosPorCategoria.map((elemento, index) => {
                return(
                    <div key={index} className="contenedor-fecha-gasto">
                        <Lista>
                            <ListaElementos>
                                <ListaElementosGastos>
                                    <IconosCategoria id={elemento.categoria}/>
                                    <FuenteListaCategorias categoria>
                                        {elemento.categoria}
                                    </FuenteListaCategorias>
                                </ListaElementosGastos>
                                <ListaElementosGastos>
                                    <FuenteListaCategorias>
                                        {convertirAMoneda(elemento.cantidad)}
                                    </FuenteListaCategorias>
                                </ListaElementosGastos>
                            </ListaElementos>
                        </Lista>
                    </div>
                )
            })}
            </ContenedorLista>

            <BarraTotalGastado />
        </>
    );
}

export default GastosPorCategoria;
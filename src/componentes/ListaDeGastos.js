import React from "react";
import ContenedorBtnSalir from './../elementos/BtnSalir';
import MenuNavegacion from "./MenuNavegacion";
import { Helmet } from "react-helmet";
import { UseAuth } from "../Contextos/AuthContext";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastos from "../hooks/useObtenerGastos";
import { ContenedorLista, 
        Lista, 
        ListaElementos, 
        ListaElementosGastos, 
        FuenteLista, 
        ElementosPrecio,
        FuenteListaPrecio,
        FuenteListaDescripcion,
        IconEditar,
        IconEliminar,
        ElementosIconos
     } from "../elementos/ElementosDeLista";
import convertirAMoneda from './../funciones/ConvertirAMoneda';
import IconosCategoria from "../elementos/IconosCategoria";
import { NavLink } from 'react-router-dom';
import {Boton} from './../elementos/ElementosFormulario';
import {ReactComponent as IconoEtiqueta} from './../imagenes/etiqueta.svg';
import styled from "styled-components";
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import borrarGasto from "../firebase/borrarGasto";
import {useTotalDelMes} from './../Contextos/TotalGastadoEnElMesContext';

const IconEtiqueta = styled(IconoEtiqueta) `
    fill: rgba(7, 59, 76, .5);
    width: 5rem;
    height: 5rem;
    margin-top: 1.5rem;
`;

const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'del' yyyy", {locale: es});
}

const fechaEsIgual = (gastos, index, gasto) => {
    if(index !== 0) {
        const fechaActual = formatearFecha(gasto.fecha);
        const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

        if(fechaActual === fechaGastoAnterior) {
            return true;
        }
        else {
            return false;
        }
    }
}

const ListaDeGastos = () => {
    const {usuario} = UseAuth();
    // console.log(usuario);

    const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();
    // console.log(gastos);

    const {total} = useTotalDelMes();

    return(
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <ContenedorBtnSalir>
            <btnSalir />
            </ContenedorBtnSalir>
            <MenuNavegacion />
            <div className="contenedor-lista-gastos">
                <h1>Bienvenido</h1>
                <p>Acá están tus gastos hasta ahora</p>
                <div className="contenedor-tarjeta">
                    <img src="./img/tarjeta.png" />
                    <p>Total de gastos</p>
                    <p className="contenedor-tarjeta__gasto">{convertirAMoneda(total)}</p>
                </div>
                <h2>Operaciones</h2>

                <ContenedorLista>
                    {gastos.map((gasto, index) => {
                        return (
                            <div key={gasto.id} className="contenedor-fecha-gasto">
                                {!fechaEsIgual(gastos, index, gasto) &&
                                <div className="contenedor-fecha">
                                    {formatearFecha(gasto.fecha)}
                                </div>
                                }
                                <Lista>
                                    <ListaElementos>
                                        <ListaElementosGastos>
                                            <IconosCategoria id={gasto.categoria} IconSize />                                
                                            <FuenteLista>
                                                {gasto.categoria}
                                            </FuenteLista>
                                        </ListaElementosGastos>
                                        <ElementosPrecio>
                                            <FuenteListaPrecio>
                                                {convertirAMoneda(gasto.cantidad)}
                                            </FuenteListaPrecio>
                                            <FuenteListaDescripcion>
                                                {gasto.descripcion}
                                            </FuenteListaDescripcion>
                                        </ElementosPrecio>
                                        <ElementosIconos>
                                            {/* <IconEditar><NavLink to={`/editar/${gasto.id}`}></NavLink></IconEditar> */}
                                            {/* <IconEditar as={Link} to={`/editar/${gasto.id}`}></IconEditar> */}
                                            <button className="boton-icono-editar"><NavLink to={`/editar/${gasto.id}`}><IconEditar /></NavLink></button>
                                            <IconEliminar onClick={() => borrarGasto(gasto.id)}/>
                                        </ElementosIconos>
                                    </ListaElementos>
                                </Lista>
                            </div>
                            )
                    })}
                </ContenedorLista>

                {hayMasPorCargar &&
                    <Boton secundary onClick={() => obtenerMasGastos()}>Cargar Más</Boton>
                }
                
                {gastos.length === 0 &&
                    <div className="contenedor-mensaje-vacio">
                        <IconEtiqueta />
                        <p>No hay gastos para mostrar</p>
                    </div>
                }
            </div>

            <BarraTotalGastado />
        </>
    );
}

export default ListaDeGastos;
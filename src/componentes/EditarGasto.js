import React, {useEffect, useState} from "react";
import { Inputs, Boton } from "../elementos/ElementosFormulario";
import styled from "styled-components";
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import agregarGasto from "../firebase/agregarGasto";
import { UseAuth } from "../Contextos/AuthContext";
import { Alerta } from "../elementos/Alerta";
import {ReactComponent as IconoLeft} from './../imagenes/left.svg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useObtenerGasto from "../hooks/useObtenerGasto";
import {Helmet} from 'react-helmet';
import {useParams, Navigate} from 'react-router-dom';
import editarGasto from "../firebase/editarGasto";

const IconLeft = styled(IconoLeft) `
    fill: #073b4c;
    margin: 0 auto;
    width: 80px;
    height: 80px;
    // transition: all .3s ease-out;

    // &:hover {
    //     fill: #118ab2;
    // }
`;

const EditarGasto = () => {
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [categoria, cambiarCategoria] = useState('Hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const {usuario} = UseAuth();

    const ruta = '/lista'
    const navigate = useNavigate();

    const regresarPagina = () => {
        navigate(ruta);
    }

    const {id} = useParams();
    const [gasto] = useObtenerGasto(id);

    const handleChange = (e) => {
        if(e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
        else if(e.target.name === "descripcion") {
            cambiarInputDescripcion(e.target.value);
        }
    }

    useEffect(() => {
        if(gasto) {
            if(gasto.data().uidUsuario === usuario.uid) {
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            }
            else {
                regresarPagina();
            }
        }
    }, [gasto, usuario])

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        if(inputCantidad !== '' && inputDescripcion !== '') {
            if(cantidad) {
                if(gasto) {
                    editarGasto({
						id: gasto.id,
						categoria: categoria,
						descripcion: inputDescripcion,
						cantidad: cantidad,
						fecha: getUnixTime(fecha)
					}).then(() => {
						regresarPagina();
					}).catch((error) => {
						console.log(error);
					})
                }
                else {
                    agregarGasto(
                        {
                            categoria: categoria,
                            descripcion: inputDescripcion,
                            cantidad: cantidad,
                            fecha: getUnixTime(fecha),
                            uidUsuario: usuario.uid
                        }
                    ).then(() => {
                        // <Navigate replace to='/'/>
                        regresarPagina();
                    }).catch((error) => {
                        console.log(error);
                    })
                    .then(() => {
                        cambiarCategoria('hogar');
                        cambiarInputCantidad('');
                        cambiarInputDescripcion('');
                        cambiarFecha(new Date());
    
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'exito', mensaje: 'Gasto ingresado correctamente'});
    
                    })
                    .catch((error) => {
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo: 'error', mensaje: 'Ocurrió un problema al guardar el gasto'});
                    })
                }
            }
            else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto'});
            }
        }
        else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Ingrese todos los campos'});
        }
    }
    
    return(
        <>
            <Helmet>
				<title>Editar Gasto</title>
			</Helmet>

            {/* <IconLeft><NavLink to="/lista"></NavLink></IconLeft> */}
            <IconLeft onClick={regresarPagina}></IconLeft>
            <form onSubmit={handleSubmit} className="formulario-editar-gasto">
                <h1>Editar Gasto</h1>
                <input className='contenedor-app__input' 
                    placeholder='S/. 0.00' 
                    type='text'
                    name="cantidad"
                    value={inputCantidad}
                    onChange={handleChange}
                    >
                </input>
                <div className="contenedor-imputs">
                    <SelectCategorias categoria={categoria} cambiarCategoria={cambiarCategoria}/>
                    <Inputs 
                        placeholder="Descripción" 
                        type="text" 
                        name="descripcion"
                        value={inputDescripcion}
                        onChange={handleChange}
                    />
                    <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
                </div>
                <Boton type="submit">Actualizar</Boton>

                <Alerta 
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
            </form>
        </>
    );
}

export default EditarGasto;
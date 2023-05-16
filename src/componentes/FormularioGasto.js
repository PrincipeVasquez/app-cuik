import React, {useState} from "react";
import { Inputs, Boton } from "../elementos/ElementosFormulario";
import styled from "styled-components";
import {ReactComponent as IconoSend} from './../imagenes/send.svg';
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import agregarGasto from "../firebase/agregarGasto";
import { UseAuth } from "../Contextos/AuthContext";
import { Alerta } from "../elementos/Alerta";

const IconoEnviar = styled(IconoSend) `
    fill: #fff;
    margin-left: 1rem;
    width: 20px;
    height: 20px;
`;

const FormularioGasto = () => {
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [categoria, cambiarCategoria] = useState('Hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const {usuario} = UseAuth();

    const handleChange = (e) => {
        if(e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
        else if(e.target.name === "descripcion") {
            cambiarInputDescripcion(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        if(inputCantidad !== '' && inputDescripcion !== '') {
            if(cantidad) {
                agregarGasto(
                    {
                        categoria: categoria,
                        descripcion: inputDescripcion,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    }
                )
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
        <form onSubmit={handleSubmit}>
            <h1>Agregar Gasto</h1>
            <input className='contenedor-app__input' 
                placeholder='S/. 0.00' 
                type='text'
                name="cantidad"
                value={inputCantidad}
                onChange={handleChange}>
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
            <Boton type="submit">Agregar<IconoEnviar /></Boton>

            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </form>
    );
}

export default FormularioGasto;
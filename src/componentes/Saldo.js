import React, {useState, useEffect} from "react";
import { Helmet } from "react-helmet";
import ContenedorBtnSalir from './../elementos/BtnSalir';
import MenuNavegacion from "./MenuNavegacion";
import { Inputs } from "../elementos/ElementosFormulario";
import {ReactComponent as IconoSend} from './../imagenes/send.svg';
import styled from "styled-components";
import {useTotalDelMes} from './../Contextos/TotalGastadoEnElMesContext';
import ConvertirAMoneda from './../funciones/ConvertirAMoneda';
import agregarSaldo from "../firebase/agregarSaldo";
import { UseAuth } from "../Contextos/AuthContext";
import { Alerta } from "../elementos/Alerta";
import useObtenerSaldo from "../hooks/useObtenerSaldo";
import GraficoDeFinanzas from './GraficoDeFinanzas';
import GraficoChartJS from './GraficoChartJS';

const IconoEnviar = styled(IconoSend) `
    fill: #06d6a0;
    margin-left: 1rem;
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

const Saldo = () => {
    const {total} = useTotalDelMes();
    const {usuario} = UseAuth();
    
    const [inputSaldo, cambiarInputSaldo] = useState('');
    const [ingreso, cambiarIngreso] = useState(0);
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const [mostrarAgregar, cambiarMostrarAgregar] = useState(true);

    const [saldo] = useObtenerSaldo(usuario.uid);
    // console.log(ingreso);
    // console.log(saldo);

    useEffect(() => {
        // if(saldo) {
        //     if(saldo.uidUsuario === usuario.uid) {
        //         cambiarIngreso(saldo.data().saldoIngreso);
        //         // console.log(saldo.data().saldoIngreso);
        //     }
        //     cambiarIngreso(saldo.saldoIngreso);
        // }

        let acumulado = saldo.reduce((acc, el) => acc + el.saldoIngreso, 0);
        cambiarIngreso(acumulado);
        // console.log(`Acumulado ${acumulado}`);
        // console.log(`Ingreso ${ingreso}`);

    }, [saldo, usuario])

    const handleChange = (e) => {
        if(e.target.name === "saldo") {
            cambiarInputSaldo(e.target.value.replace(/-[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let saldoIngreso = parseFloat(inputSaldo).toFixed(2);

        if(inputSaldo !== '') {
            if(saldoIngreso) {
                agregarSaldo(
                    {
                        saldoIngreso: saldoIngreso,
                        uidUsuario: usuario.uid,
                        ingreso: true
                    }
                )
                .then(() => {
                    cambiarInputSaldo('');
                    cambiarMostrarAgregar(false)
                })
                .catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({tipo: 'error', mensaje: 'Ocurrió un problema al guardar el saldo'});
                })
            }
            else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto'});
            }
        }
        else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'Ingrese valor en el saldo'});
        }
    }

    return(
        <>
            <Helmet>
                    <title>Saldo</title>
            </Helmet>
            <ContenedorBtnSalir>
                <btnSalir />
            </ContenedorBtnSalir>
            <MenuNavegacion />
            
            <div className="contenedor-gastos-categoria">
                <h1>Tus finanzas del mes</h1>
            </div>

            <div className="contenedor-i-e">
                <div className="contenedor-ingresos-egresos">
                    <div className="circulo azul"></div>
                    <div className="i-e-cantidad">
                        <p>Ingresos</p>
                        {/* <span>$0.00</span> */}
                        <span>{ConvertirAMoneda(ingreso)}</span>
                    </div>
                </div>
                <div className="contenedor-ingresos-egresos">
                    <div className="circulo rojo"></div>
                    <div className="i-e-cantidad">
                        <p>Egresos</p>
                        <span>{ConvertirAMoneda(total)}</span>
                        {/* <span>$30.00</span> */}
                    </div>
                </div>
            </div>

            <form className="contenedor-saldo" onSubmit={handleSubmit}>
                <Inputs
                    placeholder="Ingrese saldo a restar o sumar"
                    type="text" 
                    name="saldo"
                    value={inputSaldo}
                    onChange={handleChange}
                />
                <div className="contenedor-icono">
                    <button className="btn-enviar-saldo" type="submit"><IconoEnviar /></button>
                </div>

                <Alerta 
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
            </form>
            {/* <div className="circulo-torta"></div> */}
            <div className="grafico-torta">
                <GraficoDeFinanzas />
                {/* <GraficoChartJS /> */}
            </div>

            <div className="contenedor-saldo-disponible">
                <p>Saldo disponible</p>
                {/* <span>$1800.00</span> */}
                <span>{ConvertirAMoneda(ingreso - total)}</span>
            </div>
        </>
    )
}

export default Saldo;
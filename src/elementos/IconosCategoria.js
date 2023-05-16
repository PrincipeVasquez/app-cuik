import React from "react";
import styled from "styled-components";
import {ReactComponent as IconoComida} from './../imagenes/ca-comida.svg';
import {ReactComponent as IconoCuentas} from './../imagenes/ca-cuentas.svg';
import {ReactComponent as IconoHogar} from './../imagenes/ca-hogar.svg';
import {ReactComponent as IconoTransporte} from './../imagenes/ca-transporte.svg';
import {ReactComponent as IconoRopa} from './../imagenes/ca-ropa.svg';
import {ReactComponent as IconoSalud} from './../imagenes/ca-salud.svg';
import {ReactComponent as IconoCompras} from './../imagenes/ca-compras.svg';
import {ReactComponent as IconoDiversion} from './../imagenes/ca-diversion.svg';

const IconComida = styled(IconoComida) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconCuentas = styled(IconoCuentas) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconHogar = styled(IconoHogar) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconTransporte = styled(IconoTransporte) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconRopa = styled(IconoRopa) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconSalud = styled(IconoSalud) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconCompras = styled(IconoCompras) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconDiversion = styled(IconoDiversion) `
    fill: #118ab2;
    width: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
    height: ${(props) => props.IconSize ? '4rem' : ''}; /* 250px */
`;

const IconosCategoria = ({id, IconSize}) => {
    switch(id) {
        case 'comida':
            return <IconComida IconSize/>
        case 'cuentas y pagos':
            return <IconCuentas IconSize/>
        case 'hogar':
            return <IconHogar IconSize/>
        case 'transporte':
            return <IconTransporte IconSize/>
        case 'ropa':
            return <IconRopa IconSize/>
        case 'salud e higiene':
            return <IconSalud IconSize/>
        case 'compras':
            return <IconCompras IconSize/>
        case 'diversion':
            return <IconDiversion IconSize/>
        default:
            break;
    }
}

export default IconosCategoria;
import React, {useState} from "react";
import {ReactComponent as IconoDown} from './../imagenes/down.svg';
import styled from "styled-components";
import IconosCategoria from "../elementos/IconosCategoria";

const ContenedorSelect = styled.div`
    background: #fff;
    cursor: pointer;
    border-radius: 1.5rem; /* 10px */
    position: relative;
    height: 5rem; /* 80px */
    width: 100%;
    padding: 3.5rem 2.5rem;
    font-size: 2.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    transition: .5s ease all;
    margin: 0 0 1.2rem 0;
    border: 1px solid #118ab2;
    &:hover {
        background: #f1faee;
        // color: #fff;
    }
`;
 
const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
        width: 1.25rem; /* 20px */
        height: auto;
        margin-left: 1.25rem; /* 20px */
    }
`;
 
const Opciones = styled.div`
    background: #fff;
    position: absolute;
    // top: 5.62rem; /* 90px */
    top: 8rem;
    left: 0;
    width: 100%;
    border-radius: 1.5rem;
    max-height: 18.75rem; /* 300px */
    overflow-y: auto;
    z-index: 1;
`;
 
const Opcion = styled.div`
    padding: 1.25rem; /* 20px */
    display: flex;
    svg {
        width: 28px;
        height: auto;
        margin-right: 1.25rem; /* 20px */
    }
    &:hover {
        background: #dad7cd
    }
`;

const Icono = styled(IconoDown) `
    // width: 80px;
    height: 80px;
    // padding: 80px;
    fill: #588157;
    display: flex;
    justify-content: end;
`;

const SelectCategorias = ({categoria, cambiarCategoria}) => {
    const [mostrarSelect, cambiarMostrarSelect] = useState(false);

    const categorias = [
        {id: 'comida', texto: 'Comida'},
        {id: 'cuentas y pagos', texto: 'Cuentas y pagos'},
        {id: 'hogar', texto: 'Hogar'},
        {id: 'transporte', texto: 'Transporte'},
        {id: 'ropa', texto: 'Ropa'},
        {id: 'salud e higiene', texto: 'Salud e Higiene'},
        {id: 'compras', texto: 'Compras'},
        {id: 'diversion', texto: 'Diversion'}
    ]

    const handleClick = (e) => {
        cambiarCategoria(e.currentTarget.dataset.valor);
    }

    return(
        <ContenedorSelect onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
            <OpcionSeleccionada>{categoria}<Icono /></OpcionSeleccionada>

            {mostrarSelect &&
                <Opciones>
                    {categorias.map((categoria) => {
                        return <Opcion onClick={handleClick}
                                        key={categoria.id}
                                        data-valor={categoria.id}>
                                    <IconosCategoria id={categoria.id}/>{categoria.texto}
                                </Opcion>
                    })}
                </Opciones>
            }
        </ContenedorSelect>
    );
}

export default SelectCategorias;
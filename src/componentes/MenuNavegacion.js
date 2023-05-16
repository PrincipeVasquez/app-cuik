import React from "react";
import {NavLink} from 'react-router-dom';
import styled from "styled-components";
// import './App.css';

const MenuNavegacion = () => {
    return(
        <ContenedorMenu>
            <Navegacion>
                <NavLink to='/'>Ingresar</NavLink>
                <NavLink to='/lista'>Gastos</NavLink>
                <NavLink to='/categorias'>Categorias</NavLink>
            </Navegacion>
        </ContenedorMenu>
    );
}

const ContenedorMenu = styled.div `
    // background: #a3b18a;
    padding: 2rem;
    width: 100%
`;

const Navegacion = styled.nav `
    display: flex;
    justify-content: space-evenly;

    && a {
        font-size: 2.2rem;
        text-decoration: none;
        color: #073b4c;
        font-weight: 700;
        padding: 0 2rem;
        font-family: "Poppins", sans-serif;
    }

    && a.active {
        // text-decoration: underline;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #344e41;
        line-height: 25pt;
        // width: 50%;
    }
`;

export default MenuNavegacion;
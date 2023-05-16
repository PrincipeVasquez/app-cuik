import React from "react";
import styled from "styled-components";

const ContenedorFormulario = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Inputs = styled.input `
    padding: 2rem;
    width: 100%;
    font-size: 2.5rem;
    border-radius: 1.5rem;
    border: 1px solid #118ab2;
    margin: 1rem 0;
`;

const Boton = styled.button `
    padding: 2rem;
    // width: 100%;
    width: ${(props) => props.secundary ? '50%' : '100%'};
    // margin: 6rem 0 0 0;
    margin: ${(props) => props.secundary ? '2.5rem auto' : '6rem 0 0 0'};
    font-size: 2.5rem;
    // background: linear-gradient(#344e41, #588157);
    // background-color: #06d6a0;
    background-color: ${(props) => props.secundary ? '#118ab2' : '#06d6a0'};
    color: white;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: all .3s ease-out;
    display: flex;
    justify-content: center;
    font-family: "Poppins", sans-serif;

    &:hover {
        // background-color: #ffd166;
        background-color: ${(props) => props.secundary ? '#073b4c' : '#ffd166'};
    }
`;

export {ContenedorFormulario, Inputs, Boton};
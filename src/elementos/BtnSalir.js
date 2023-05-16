import React from "react";
import styled from "styled-components";
import {ReactComponent as IconoSalir} from './../imagenes/exit.svg'
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from './../firebase/FirebaseConfig';

const Btn = styled.button`
    display: block;
    width: 3.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 1.25rem; /* 20px */
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;
 
    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`;

const BtnIcono = styled.button`
    padding: 20px;
`;

const ContenedorBtnSalir = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: end;
    background: #f8f9fa;
    padding: .5rem;
`;

const Icono = styled(IconoSalir) `
    width: 10%;
    height: auto;
    fill: #073b4c;
    display: flex;
    justify-content: end;
    cursor: pointer;
`;

const BtnSalir = ({ruta = '/inicio-sesion'}) => {
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            navigate(ruta);
        }
        catch(error) {
            console.log(error);
        }
    }

    return(
        <ContenedorBtnSalir>
            {/* <Icono onClick={() => navigate(ruta)} /> */}
            <Icono onClick={cerrarSesion} />
        </ContenedorBtnSalir>
    );
}

export default BtnSalir;
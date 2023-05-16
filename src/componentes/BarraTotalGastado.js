import React from "react";
import styled from "styled-components";
import ConvertirAMoneda from './../funciones/ConvertirAMoneda';
import {useTotalDelMes} from './../Contextos/TotalGastadoEnElMesContext';

const BarraTotal = styled.div`
    // position: absolute;
    // top: 84rem;
    // width: 100%;
    margin-top: 2rem;

    background: #118ab2;
    border-radius: 1.5rem;
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const BarraTotalGastado = () => {
    const {total} = useTotalDelMes();
    // console.log(total);

    return(
        <BarraTotal>
            <p>Total gastado en el mes:</p>
            <p>{ConvertirAMoneda(total)}</p>
        </BarraTotal>
    );
}

export default BarraTotalGastado;
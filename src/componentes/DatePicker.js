import React, {useState} from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {es} from 'date-fns/locale/'
import { Inputs } from "../elementos/ElementosFormulario";
import { format } from 'date-fns'
import styled from "styled-components";

const ContenedorInput = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #118ab2;
        cursor: pointer;
        border-radius: 1.5rem
        height: 5rem; /* 80px */
        width: 100%;
        // padding: 0 1.25rem; /* 20px */
        padding: 3.5rem
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
        margin: 0;
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

const formatFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMMM 'del' yyyy`, {locale: es})
}

const DatePicker = ({fecha, cambiarFecha}) => {
    const [visible, cambiarVisible] = useState(false);

    return(
        <ContenedorInput>
            <Inputs readOnly value={formatFecha(fecha)} onClick={() => cambiarVisible(!visible)}/>
            {visible &&
                <DayPicker mode="single" selected={fecha} onSelect={cambiarFecha} locale={es} />
            }
        </ContenedorInput>
    )
}

export default DatePicker;
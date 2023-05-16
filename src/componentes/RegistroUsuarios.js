import React, {useState} from "react";
import { Helmet } from 'react-helmet';
import ContenedorBtnSalir from './../elementos/BtnSalir';
import {Inputs, Boton} from './../elementos/ElementosFormulario';
import {auth} from './../firebase/FirebaseConfig';
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { Alerta } from "../elementos/Alerta";

const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState();
    const [password, establecerPassword] = useState();
    const [password2, establecerPassword2] = useState();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        // console.log(e.target.name);
        switch(e.target.name) {
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            case 'password2':
                establecerPassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)) {
        // console.log('Ingrese correo válido');
        cambiarEstadoAlerta(true);
        cambiarAlerta({
            tipo: 'error',
            mensaje: 'Ingrese correo válido'
        })
        return;
        }

        if(correo === '' || password === '' || password2 === '') {
            // console.log('Los campos no deben estar vacios');
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Los campos no deben estar vacios'
            })
            return;
        }

        if(password !== password2) {
            // console.log('Las contraseñas no son iguales');
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no son iguales'
            })
            return;
        }

        // console.log('Usuario registrado');
        try {
            await createUserWithEmailAndPassword(auth, correo, password);
            navigate('/');
        }
        catch(error) {
            cambiarEstadoAlerta(true);

            let mensaje;
            switch(error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña es incorrecta';
                    break;
                case 'auth/weak-password':
                    mensaje = 'La contraseña es muy corta';
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El email es inválido';
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'El email ya está en uso';
                    break;
                default:
                    mensaje = 'Hubo un error al crear la cuenta';
                    break;
            }

            cambiarAlerta({tipo: 'error', mensaje: mensaje});
        }
    }

    return(
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>
            <ContenedorBtnSalir>
                {/* <NavLink to='/'>Inicio</NavLink> */}
                <btnSalir />
            </ContenedorBtnSalir>
            <form className="contenedor-crear-cuenta" onSubmit={handleSubmit}>
                <h1>Crear Cuenta</h1>
                <Inputs 
                    type="email" 
                    name="email" 
                    placeholder="Ingrese correo"
                    value={correo}
                    onChange={handleChange}>
                </Inputs>

                <Inputs 
                    type="password" 
                    name="password" 
                    placeholder="Ingrese contraseña"
                    value={password}
                    onChange={handleChange}>
                </Inputs>

                <Inputs 
                    type="password" 
                    name="password2" 
                    placeholder="Repita contraseña"
                    value={password2}
                    onChange={handleChange}>
                </Inputs>
                
                <Boton type="submit">Crear</Boton>
            </form>

            <Alerta 
                tipo={alerta.tipo} 
                mensaje={alerta.mensaje} 
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    );
}

export default RegistroUsuarios;
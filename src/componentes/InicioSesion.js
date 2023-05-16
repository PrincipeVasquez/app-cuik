import React, {useState} from "react";
import { Helmet } from 'react-helmet';
import {Inputs, Boton} from './../elementos/ElementosFormulario';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../firebase/FirebaseConfig';
import { Alerta } from "../elementos/Alerta";

const InicioSesion = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState();
    const [password, establecerPassword] = useState();
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
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
		e.preventDefault();
		cambiarEstadoAlerta(false);
		cambiarAlerta({});

		// Comprobamos del lado del cliente que el correo sea valido.
		const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
		if( !expresionRegular.test(correo) ){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Ingrese un correo electrónico valido'
			});
			return;
		}

		if(correo === '' || password === ''){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor rellena todos los datos'
			});
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, correo, password);
			navigate('/');
		} catch(error) {
			console.log(error)
			cambiarEstadoAlerta(true);
			let mensaje;
			switch(error.code){
				case 'auth/wrong-password':
					mensaje = 'La contraseña no es correcta.'
					break;
				case 'auth/user-not-found':
					mensaje = 'La cuenta ingresada no existe'
					break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				    break;
			}

			cambiarAlerta({tipo: 'error', mensaje: mensaje});
		}
	}

    return(
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <form className="contenedor-crear-cuenta" onSubmit={handleSubmit}>
                <img src="/img/cuik.png" width="100" alt="cuik" />
                <h1>Login</h1>
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

                <Boton type="submit">Iniciar</Boton>
                <p onClick={() => navigate('/crear-cuenta')}>¿Aún no tienes una cuenta?</p>
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

export default InicioSesion;
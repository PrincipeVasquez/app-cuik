import React, {createContext, useContext, useEffect, useState} from "react";
import { auth } from "./../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const UseAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    const [cargando, cambiarCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSuscripcion;
    }, []);
    
    return(
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext, UseAuth};
import React from "react";
import { UseAuth } from "../Contextos/AuthContext";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({children}) => {
    const {usuario} = UseAuth();

    if(usuario) {
        return children;
    }
    else {
        return <Navigate replace to="/inicio-sesion" />;
    }
}

export default RutaPrivada;
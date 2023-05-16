import React, {createContext, useContext, useEffect, useState} from "react";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";

const totalGastadoContext = createContext();

const useTotalDelMes = () => useContext(totalGastadoContext);

const TotalGastadoProvider = ({children}) => {
    const [total, cambiarTotal] = useState(0);
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        // let acumulado = 0;
        // gastos.forEach((gasto) => {
        //     acumulado += gasto.cantidad;
        // })

        // cambiarTotal(acumulado);
        let acumulado = gastos.reduce((acc, el) => acc + el.cantidad, 0);
        // console.log(gastos);
        // console.log(gastos[0]);
        // console.log(acumulado);
        cambiarTotal(acumulado);
    }, [gastos])

    return(
        <totalGastadoContext.Provider value={{total: total}}>
            {children}
        </totalGastadoContext.Provider>
    );
}

export {TotalGastadoProvider, useTotalDelMes};
import React, {useState, useEffect} from "react";
import {VictoryPie, VictoryChart, VictoryLabel, VictoryBar, VictoryTheme} from 'victory';
import {useTotalDelMes} from './../Contextos/TotalGastadoEnElMesContext';
import useObtenerSaldo from "../hooks/useObtenerSaldo";
import { UseAuth } from "../Contextos/AuthContext";

const GraficoDeFinanzas = () => {
    const {usuario} = UseAuth();
    const {total} = useTotalDelMes();
    const [saldo] = useObtenerSaldo(usuario.uid);

    // const [ingresoActual, cambiarIngresoActual] = useState(0)
    // const [egresoActual, cambiarEgresoActual] = useState(0)

    let ingreso = saldo.reduce((acc, el) => acc + el.saldoIngreso, 0).toFixed(2);

    const gastosPorcentaje = Math.round((total/ingreso)*100);
    const ingresosPorcentaje = (100 - gastosPorcentaje);

    // useEffect(() => {
    //     cambiarEgresoActual(gastosPorcentaje);

    //     cambiarIngresoActual(ingresosPorcentaje);
    // }, [ingresoActual, egresoActual])

    // const gastosPorcentaje = Math.round((total/ingreso)*100);
    console.log(`gastosPorcentaje: ${gastosPorcentaje}`);

    // const ingresosPorcentaje = (100 - gastosPorcentaje);
    console.log(`ingresosPorcentaje: ${ingresosPorcentaje}`);

    return(
        <VictoryPie
            colorScale={['#ef476f', '#118ab2']}
            data={[
                { x: "Egresos", y: gastosPorcentaje },
                { x: "Ingresos", y: ingresosPorcentaje }
            ]}
            // animate={{
            //     duration: 200,
            //   }}
            labels={({datum}) => `${datum.y}%`}
            innerRadius={100}
            labelComponent={
                <VictoryLabel 
                    // angle={45}
                    style={{fill: "#073b4c"}}
                />
            }
        />

        // <VictoryChart
        //     theme={VictoryTheme.material}
        //     domainPadding={10}
        // >
        // <VictoryBar
        //     style={{ data: { fill: "#c43a31" } }}
        //     data={[
        //         { x: "Ingresos", y: ingresosPorcentaje },
        //         { x: "Egresos", y: gastosPorcentaje }
        //     ]}
        //     // animate={{
        //     //     duration: 200,
        //     //   }}
        // />
        // </VictoryChart>
    );
}

export default GraficoDeFinanzas;
import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import {useTotalDelMes} from './../Contextos/TotalGastadoEnElMesContext';
import useObtenerSaldo from "../hooks/useObtenerSaldo";
import { UseAuth } from "../Contextos/AuthContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const GraficoChartJS = () => {
    const {usuario} = UseAuth();
    const {total} = useTotalDelMes();
    const [saldo] = useObtenerSaldo(usuario.uid);
    
    let ingreso = saldo.reduce((acc, el) => acc + el.saldoIngreso, 0).toFixed(2);
    
    const gastosPorcentaje = Math.round((total/ingreso)*100);
    const ingresosPorcentaje = (100 - gastosPorcentaje);

    var options = {
        responsive: true,
        maintainAspectRatio: false
    }
    
    var data = {
        datasets: [
            {
                data: [gastosPorcentaje, ingresosPorcentaje],
                backgroundColor: [
                    '#ef476f',
                    '#118ab2'
                ],
                borderColor: [
                    '#fff',
                    '#000'
                ],
                borderWidth: 1
            }
        ]
    }

    return(
        <Pie data={data} options={options}/>
    );
}

export default GraficoChartJS;
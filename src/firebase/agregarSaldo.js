import {db} from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const agregarSaldo = ({saldoIngreso, uidUsuario, ingreso}) => {
    return addDoc(collection(db, 'gastos'), {
        saldoIngreso: Number(saldoIngreso),
        uidUsuario: uidUsuario,
        ingreso: ingreso
    })
}

export default agregarSaldo;
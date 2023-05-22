import {useEffect, useState} from 'react';
import {db} from './../firebase/FirebaseConfig';
// import {useNavigate} from 'react-router-dom';
// import {doc, getDoc} from 'firebase/firestore';
import { UseAuth } from "../Contextos/AuthContext";
import { collection, onSnapshot, query, where, startAfter } from 'firebase/firestore';

const useObtenerSaldo = (id) => {
    const [saldo, cambiarSaldo] = useState([]);
    const {usuario} = UseAuth();

    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('uidUsuario', '==', usuario.uid),
            where('ingreso', '==', true)
            // limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            cambiarSaldo(snapshot.docs.map((saldo) => {
                return {...saldo.data(), id: saldo.id}
            }))
        })

        return unsuscribe;
    }, [usuario]);

    return [saldo];
}

export default useObtenerSaldo;
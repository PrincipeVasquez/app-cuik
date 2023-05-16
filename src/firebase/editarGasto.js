import {db} from './FirebaseConfig';
import {doc, updateDoc} from 'firebase/firestore';

const editarGasto = ({id, categoria, descripcion, cantidad, fecha}) => {
    const documento = doc(db, 'gastos', id);

    return updateDoc(documento, {
        categoria: categoria,
		descripcion: descripcion,
		cantidad: Number(cantidad),
		fecha: fecha
    });
}

export default editarGasto;
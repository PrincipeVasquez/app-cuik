import styled from 'styled-components';
import {ReactComponent as IconoEditar} from './../imagenes/edit.svg';
import {ReactComponent as IconoEliminar} from './../imagenes/trash.svg';

const ContenedorLista = styled.div `
    // background: green;
    // border-radius: 1.5rem;
`;

const Lista = styled.div `
    display: flex;
    flex-direction: column;
`;

const ListaElementos = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
`;

const ListaElementosGastos = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const FuenteLista = styled.p `
    font-size: 3rem;
    font-family: "Poppins", sans-serif;
    // text-transform: uppercase;
    color: rgba(7, 59, 76, .5);
    margin-left: .5rem;
    font-weight: 500;
`;

const FuenteListaCategorias = styled.p `
    font-size: 2rem;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    color: #073b4c;
    // margin-left: .5rem;
    font-weight: 500;
    margin-left: ${(props) => props.categoria ? '1rem' : ''}; /* 250px */
`;

const ElementosPrecio = styled.div `
    display: flex;
    flex-direction: column;
    align-items: end;
`;

const FuenteListaPrecio = styled.p `
    font-size: 3rem;
    font-family: "Poppins", sans-serif;
    color: rgba(7, 59, 76, .5);
    font-weight: 500;
`;

const FuenteListaDescripcion = styled.p `
    font-size: 30px;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
`;

const IconEditar = styled(IconoEditar) `
    fill: rgba(7, 59, 76, .5);
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
    transition: all .3s ease-out;
    cursor: pointer;

    &: hover {
        fill: #073b4c;
    }
`;

const IconEliminar = styled(IconoEliminar) `
    fill: rgba(7, 59, 76, .5);
    width: 3rem;
    height: 3rem;
    transition: all .3s ease-out;
    cursor: pointer;

    &: hover {
        fill: #073b4c;
    }
`;

const ElementosIconos = styled.div `
    display: flex;
    align-items: center;
`;

export {ContenedorLista, 
        Lista, ListaElementos, 
        ListaElementosGastos, 
        FuenteLista, 
        ElementosPrecio,
        FuenteListaPrecio,
        FuenteListaDescripcion,
        IconEditar,
        IconEliminar,
        ElementosIconos,
        FuenteListaCategorias};
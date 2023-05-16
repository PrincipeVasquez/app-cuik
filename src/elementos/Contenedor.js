import styled from "styled-components";

const Contenedor = styled.div `
    background: #f8f9fa;
    width: 90%;
    max-width: 70rem;
    height: 90vh;
    // max-height: 50rem;
    overflow-y: auto;
    // box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
    // border-radius: 0.625rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    position: relative;
    z-index: 100;
    // border: 1px solid #000;

    @media(max-width: 60rem) { /* 950px */
        height: 95vh;
        max-height: none;
    }
`

export default Contenedor;
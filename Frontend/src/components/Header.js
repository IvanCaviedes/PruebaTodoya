import React from 'react'
import { useHistory } from 'react-router-dom'

function Header({ tipo }) {
    const history = useHistory()
    if (tipo == "1") {
        return (
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a href={"#"} class="navbar-brand">Prueba Tecnica</a>
                <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal">Crear Nueva carpeta</button>
            </nav>
        )
    }
    else {
        return (
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a href={"#"} class="navbar-brand">Prueba Tecnica</a>
                <div>
                    <button className='btn btn-primary px-5 mr-2' onClick={() => history.push("/carpetas")}>Ver lista de carpetas</button>
                    <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal1" >Agregar Archivo</button>
                </div>
            </nav>
        )
    }
}

export default Header

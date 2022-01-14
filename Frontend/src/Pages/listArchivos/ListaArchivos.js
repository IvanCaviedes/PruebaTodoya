import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import GetArchivos from '../../redux/actions/GetArchivos'
import { useDispatch, useSelector } from 'react-redux'
import AgregarArchivo from '../../redux/actions/AgregarArchivo'
import EliminarArchivos from '../../redux/actions/EliminarArchivos'
import Header from '../../components/Header'
import Modals from '../../components/Modals'
import Footer from '../../components/Footer'

function ListaArchivos() {
    const { id } = useParams()
    const history = useHistory()
    const { state } = useLocation();
    const dispatch = useDispatch()
    const { payload } = useSelector(e => e.DatosReducer)


    useEffect(() => {
        dispatch(GetArchivos({ idcarpeta: id }))
        return null
    }, [])

    const validarData = (modulo) => {
        let data = payload.filter(valor => {
            return valor[modulo]
        })
        return data[0]
    }

    const DeleteArchivos = (ideliminar) => {
        if (window.confirm("Want to delete?")) {
            dispatch(EliminarArchivos({ idcarpeta: id, id: ideliminar }))
        }
    }
    return (
        <>

            <Header tipo={"2"} />
            <div className="container">
                <div className="row pt-5">
                    <div className="d-flex justify-content-end col-12">
                        <button className='btn btn-primary px-5 mr-2' onClick={() => history.push("/carpetas")}>Ver lista de carpetas</button>
                        <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal1" >Agregar Archivo</button>
                    </div>
                    {
                        validarData("Archivos") &&
                            validarData('Archivos').Archivos.length > 0 ?
                            validarData('Archivos').Archivos.map((Archivo, i) => {

                                return (
                                    <div className="col-md-4 col-12 pb-4" >
                                        <div class="card text-center" style={{ width: "18rem", cursor: "pointer" }}>
                                            <a target={"_blank"} href={Archivo.path}>
                                                <img class="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4c1hVYca7uPnqepz2K-_TATsEteHhwCMwCA&usqp=CAU" />
                                                <h3>{Archivo.originalname}</h3>
                                            </a>
                                            <button className='btn btn-danger btn-lg btn-block' onClick={() => DeleteArchivos(Archivo._id)}>Eliminar</button>

                                        </div>
                                    </div>
                                )


                            }) :
                            <div className="pt-5">
                                <h1>En el momento no hay archivos puedes añadir uno!</h1>
                            </div>
                    }


                </div>
                <Modals state={state} id={id} />

            </div>
            <Footer />
        </>
    )
}

export default ListaArchivos

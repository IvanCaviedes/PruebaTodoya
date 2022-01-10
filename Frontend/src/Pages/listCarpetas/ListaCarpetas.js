import React from 'react'
import { useEffect } from 'react'
import ObtenerCarpetas from '../../redux/actions/GetCarpetas'
import CrearCarpetaRedux from '../../redux/actions/PostCarpetaAction'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'


function ListaCarpetas() {

    const history = useHistory()
    const { payload } = useSelector(e => e.DatosReducer)
    const [nombrecarpeta, setnombrecarpeta] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ObtenerCarpetas())
        return null
    }, [])

    const validarData = (modulo) => {
        let data = payload.filter(valor => {
            return valor[modulo]
        })
        return data[0]
    }

    const crearCarpeta = () => {
        if (nombrecarpeta == "") {
            alert("no puede estar vacio")
        } else {
            let payload = {
                nombreCarpeta: nombrecarpeta
            }
            dispatch(CrearCarpetaRedux(payload))
        }
    }
    const irCarpeta = (id, carpeta) => {
        history.push(`/carpeta/${id}`,carpeta)
    }

    return (
        <div className="container">
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a href={"#"} class="navbar-brand">Prueba Tecnica</a>
                <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal">Crear Nueva carpeta</button>
            </nav>

            <div className="row pt-5">
                {
                    validarData("carpetas") &&
                        validarData('carpetas').carpetas.length > 0 ?
                        validarData('carpetas').carpetas.map((carpeta, i) => (
                            <div className="col-md-4 col-12 pb-4" >
                                <div class="card text-center" style={{ width: "18rem", cursor: "pointer" }} onClick={() => irCarpeta(carpeta._id,carpeta)}>
                                    <img class="img-fluid" src={"https://i.pinimg.com/originals/97/76/75/97767530ee9760e0c3124be123f6cce4.png"} />
                                    <h3>{carpeta.nombreCarpeta}</h3>
                                </div>
                            </div>
                        )) :
                        <h1>No hay carpetas</h1>
                }
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form className='pt-5' >
                                <h1 className="h3 mb-3 fw-normal">Nombre de la carpeta</h1>
                                <div className="my-3">
                                    <input type="text" className="form-control" value={nombrecarpeta} onChange={(e) => setnombrecarpeta(e.target.value)} placeholder="carpeta1" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onClick={crearCarpeta}>Crear Carpeta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaCarpetas

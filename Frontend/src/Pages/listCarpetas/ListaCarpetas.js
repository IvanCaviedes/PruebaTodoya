import React from 'react'
import { useEffect } from 'react'
import ObtenerCarpetas from '../../redux/actions/GetCarpetas'
import CrearCarpetaRedux from '../../redux/actions/PostCarpetaAction'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Modals from '../../components/Modals'
import Footer from '../../components/Footer'


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
            setnombrecarpeta("")
        }
    }
    const irCarpeta = (id, carpeta) => {
        history.push(`/carpeta/${id}`, carpeta)
    }

    return (

        <>
            <Header tipo={"1"} />
            <div className="container">
                <div className="row pt-5">
                    <div className="d-flex justify-content-end col-12">
                        <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal">Crear Nueva carpeta</button>
                    </div>
                    {
                        validarData("carpetas") &&
                        validarData('carpetas').carpetas.length > 0 &&
                        <div className="col-12 d-flex justify-content-center py-5">
                            <h1>Revisa Tus carpetas creadas o crea una nueva</h1>
                        </div>
                    }

                    {
                        validarData("carpetas") &&
                            validarData('carpetas').carpetas.length > 0 ?
                            validarData('carpetas').carpetas.map((carpeta, i) => (
                                <div className="col-md-4 col-12 pb-4" >
                                    <div class="card text-center" style={{ width: "18rem", cursor: "pointer" }} onClick={() => irCarpeta(carpeta._id, carpeta)}>
                                        <img class="img-fluid" src={"https://i.pinimg.com/originals/97/76/75/97767530ee9760e0c3124be123f6cce4.png"} />
                                        <h3 >{carpeta.nombreCarpeta}</h3>
                                    </div>
                                </div>
                            )) :
                            <div className="pt-5">
                                <h1>En el momento no hay carpetas crea una!</h1>
                            </div>
                    }

                </div>
                <Modals nombrecarpeta={nombrecarpeta} setnombrecarpeta={setnombrecarpeta} crearCarpeta={crearCarpeta} />
            </div>
            <Footer />
        </>
    )
}

export default ListaCarpetas

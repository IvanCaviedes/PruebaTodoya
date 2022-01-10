import React from 'react'
import { useEffect } from 'react'
import ObtenerCarpetas from '../../redux/actions/GetCarpetas'
import CrearCarpetaRedux from '../../redux/actions/PostCarpetaAction'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import Modals from '../../components/Modals'


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
        <div className="container">
            <Header tipo={"1"} />
            <div className="row pt-5">
                {
                    validarData("carpetas") &&
                        validarData('carpetas').carpetas.length > 0 ?
                        validarData('carpetas').carpetas.map((carpeta, i) => (
                            <div className="col-md-4 col-12 pb-4" >
                                <div class="card text-center" style={{ width: "18rem", cursor: "pointer" }} onClick={() => irCarpeta(carpeta._id, carpeta)}>
                                    <img class="img-fluid" src={"https://i.pinimg.com/originals/97/76/75/97767530ee9760e0c3124be123f6cce4.png"} />
                                    <h3>{carpeta.nombreCarpeta}</h3>
                                </div>
                            </div>
                        )) :
                        <h1>No hay carpetas</h1>
                }
            </div>
            <Modals nombrecarpeta={nombrecarpeta} setnombrecarpeta={setnombrecarpeta} crearCarpeta={crearCarpeta}/>
        </div>
    )
}

export default ListaCarpetas

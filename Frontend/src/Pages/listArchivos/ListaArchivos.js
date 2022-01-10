import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import GetArchivos from '../../redux/actions/GetArchivos'
import { useDispatch, useSelector } from 'react-redux'
import AgregarArchivo from '../../redux/actions/AgregarArchivo'

function ListaArchivos() {
    const { id } = useParams()
    const history = useHistory()
    const { state } = useLocation();
    const dispatch = useDispatch()
    const { payload } = useSelector(e => e.DatosReducer)

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('carpeta', state.nombreCarpeta);
        dispatch(AgregarArchivo({ formData, id }))
    };

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


    return (
        <div className="container">
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a href={"#"} class="navbar-brand">Prueba Tecnica</a>
                <div>
                    <button className='btn btn-primary px-5 mr-2' onClick={() => history.push("/carpetas")}>Ver lista de carpetas</button>
                    <button className='btn btn-success px-5' data-toggle="modal" data-target="#exampleModal1" >Agregar Archivo</button>
                </div>
            </nav>

            <div className="row pt-5">
                {
                    validarData("Archivos") &&
                        validarData('Archivos').Archivos.length > 0 ?
                        validarData('Archivos').Archivos.map((Archivo, i) => {

                            return (
                                <div className="col-md-4 col-12 pb-4" >
                                    <div class="card text-center" style={{ width: "18rem", cursor: "pointer" }}>
                                        <a target={"_blank"} href={Archivo.path}>
                                            <img class="img-fluid" src={Archivo.path} />
                                            <h3>{Archivo.originalname}</h3>
                                        </a>
                                    </div>
                                </div>
                            )


                        }) :
                        <h1>No hay carpetas</h1>
                }


            </div>



            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <h1 className="h3 mb-3 fw-normal">Agrega el archivo</h1>
                                <div className="my-3">
                                    <input type="file" name="file" onChange={changeHandler} />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onClick={handleSubmission}>Guardar Archivo Archivo</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListaArchivos

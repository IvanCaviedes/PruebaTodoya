import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AgregarArchivo from '../redux/actions/AgregarArchivo'
function Modals({ state,id,nombrecarpeta,setnombrecarpeta,crearCarpeta }) {

    const dispatch = useDispatch()
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

    return (
        <div>
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

export default Modals

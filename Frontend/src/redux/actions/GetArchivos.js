import Const from '../../utils/Const'
import Api from '../../Api'

export const ArchivosRequest = () => {
    return {
        type: Const.ObtenerDatos
    }
}
export const ArchivosRequestSuccess = (payload) => {
    return {
        type: Const.ObtenerDatosSuccess,
        payload
    }
}
export const ArchivosRequestFailed = (err) => {
    return {
        type: Const.ObtenerDatosFailed,
        payload: err
    }
}
const ArchivosAction = (valor) => {
    return (dispatch) => {
        dispatch(ArchivosRequest())

        let token = localStorage.getItem("idToken")
        Api({
            method: 'GET',
            url: `/files/${valor.idcarpeta}`,
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then(
            res => {
                dispatch(ArchivosRequestSuccess({ data: res.data, modulo: "Archivos", status: res.status }))
            }
        ).catch(e => {
            dispatch(ArchivosRequestFailed(e))
        })
    }
}
export default ArchivosAction;
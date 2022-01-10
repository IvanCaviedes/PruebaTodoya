import Const from '../../utils/Const'
import Api from '../../Api'

export const CarpetaRequest = () => {
    return {
        type: Const.ObtenerDatos
    }
}
export const CarpetaRequestSuccess = (payload) => {
    return {
        type: Const.ObtenerDatosSuccess,
        payload
    }
}
export const CarpetaRequestFailed = (err) => {
    return {
        type: Const.ObtenerDatosFailed,
        payload: err
    }
}
const UpdateClienteAction = (valor) => {
    return (dispatch) => {
        dispatch(CarpetaRequest())
        let token = localStorage.getItem("idToken")
        Api({
            method: 'GET',
            url: `/folder/`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(
            res => {
                dispatch(CarpetaRequestSuccess({ data: res.data, modulo: "carpetas", status: res.status }))
            }
        ).catch(e => {
            dispatch(CarpetaRequestFailed(e))
        })
    }
}
export default UpdateClienteAction;
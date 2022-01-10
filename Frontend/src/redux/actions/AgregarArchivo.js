import Api from '../../Api'
import Const from '../../utils/Const'
import GetArchivos from '../actions/GetArchivos'

export const AgregarArchivoRequest = () => {
    return {
        type: Const.ObtenerDatos
    }
}
export const AgregarArchivoSuccess = (payload) => {
    return {
        type: Const.MensajeDatosAction,
        payload
    }
}
export const AgregarArchivoFailed = (err) => {
    return {
        type: Const.ObtenerDatosFailed,
        payload: err
    }
}
const AgregarArchivoAction = ({ formData, id }) => {
    return (dispatch) => {
        dispatch(AgregarArchivoRequest())
        let token = localStorage.getItem("idToken")
        Api({
            method: 'POST',
            url: `/files/upload`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            res => {
                dispatch(AgregarArchivoSuccess({ data: res.data }))
                dispatch(GetArchivos({idcarpeta:id}))
            }
        ).catch(e => {
            dispatch(AgregarArchivoFailed(e))
        })
    }
}
export default AgregarArchivoAction;
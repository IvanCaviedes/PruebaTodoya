import Api from '../../Api'
import Const from '../../utils/Const'
import getCarpetas from '../actions/GetCarpetas'
import GetArchivos from '../actions/GetArchivos'

export const EliminarArchivoRequest = () => {
    return {
        type: Const.ObtenerDatos
    }
}
export const EliminarArchivoSuccess = (payload) => {
    return {
        type: Const.MensajeDatosAction,
        payload
    }
}
export const EliminarArchivoFailed = (err) => {
    return {
        type: Const.ObtenerDatosFailed,
        payload: err
    }
}
const EliminarArchivoAction = ({ idcarpeta, id }) => {
    return (dispatch) => {
        dispatch(EliminarArchivoRequest())
        let token = localStorage.getItem("idToken")
        Api({
            method: 'DELETE',
            url: `/files/delete/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            res => {
                dispatch(EliminarArchivoSuccess({ data: res.data }))
                dispatch(GetArchivos({ idcarpeta }))
            }
        ).catch(e => {
            dispatch(EliminarArchivoFailed(e))
        })
    }
}
export default EliminarArchivoAction;
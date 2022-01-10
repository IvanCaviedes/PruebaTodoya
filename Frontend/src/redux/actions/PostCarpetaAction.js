import Api from '../../Api'
import Const from '../../utils/Const'
import getCarpetas from '../actions/GetCarpetas'

export const CrearCarpetaRequest = () => {
    return {
        type: Const.ObtenerDatos
    }
}
export const CrearCarpetaSuccess = (payload) => {
    return {
        type: Const.MensajeDatosAction,
        payload
    }
}
export const CrearCarpetaFailed = (err) => {
    return {
        type: Const.ObtenerDatosFailed,
        payload: err
    }
}
const CrearCarpetaAction = (valor) => {
    return (dispatch) => {
        dispatch(CrearCarpetaRequest())
        let token = localStorage.getItem("idToken")
        Api({
            method: 'POST',
            url: `/folder/create`,
            data: valor,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            res => {
                dispatch(CrearCarpetaSuccess({ data: res.data }))
                dispatch(getCarpetas())
            }
        ).catch(e => {
            dispatch(CrearCarpetaFailed(e))
        })
    }
}
export default CrearCarpetaAction;
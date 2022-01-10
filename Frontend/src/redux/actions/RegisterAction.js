import Api from '../../Api'
import Const from './../../utils/Const'

export const RegisterRequest = () => {
    return {
        type: Const.loginAction
    }
}
export const RegisterSuccess = (payload) => {
    return {
        type: Const.SuccessLogin,
        payload
    }
}
export const RegisterFailed = (err) => {
    return {
        type: Const.FailLogin,
        payload: err
    }
}
const RegisterAction = (valor) => {
    return (dispatch) => {
        dispatch(RegisterRequest())
        Api({
            method: 'POST',
            url: '/auth/register',
            data: valor
        }).then(
            res => {
                localStorage.setItem('idToken', res.data.token);
                dispatch(RegisterSuccess({ data: res.data, logueado: true }))
            }
        ).catch(e => {
            dispatch(RegisterFailed({ data: e.response.data, status: e.response.status }))
        })
    }
}
export default RegisterAction;
import Api from '../../Api'
import Const from './../../utils/Const'

export const LoginRequest = () => {
    return {
        type: Const.loginAction
    }
}
export const LoginSuccess = (payload) => {
    return {
        type: Const.SuccessLogin,
        payload
    }
}
export const LoginFailed = (err) => {
    return {
        type: Const.FailLogin,
        payload: err
    }
}
const LoginAction = (valor) => {
    return (dispatch) => {
        dispatch(LoginRequest())
        Api({
            method: 'POST',
            url: '/auth/Login',
            data: valor
        }).then(
            res => {
                localStorage.setItem('idToken', res.data.token);
                dispatch(LoginSuccess({ data: res.data, logueado: true }))
            }
        ).catch(e => {
            dispatch(LoginFailed({ data: e.response.data, status: e.response.status }))
        })
    }
}
export default LoginAction;
import Const from '../../utils/Const'

const authReducer = (state = {
    loading: false,
    payload: '',
    error: '',
    logueado: false
}, action) => {
    switch (action.type) {
        case Const.loginAction:
            return {
                ...state,
                loading: true
            }
        case Const.SuccessLogin:
            return {
                ...state,
                loading: false,
                payload: action.payload.data,
                logueado: action.payload.logueado,
                error: ''
            }
        case Const.FailLogin:
            return {
                ...state,
                loading: false,
                payload: '',
                error: action.payload
            }
        default:
            return state
    }
}
export default authReducer;
import Const from '../../utils/Const'

const DatosReducer = (state = {
    loading: false,
    payload: [],
    error: '',
    mensaje: ''
}, action) => {
    switch (action.type) {
        case Const.ObtenerDatos:
            return {
                ...state,
                loading: true
            }
        case Const.ObtenerDatosSuccess:

            var data = state.payload.filter(valor => {
                return valor[action.payload.modulo]
            })
            state.payload.map((value, i) => {
                if (value[action.payload.modulo]) {
                    if (action.payload.status === 402) {
                        state.payload.slice(value, i)
                    } else {
                        value[action.payload.modulo] = action.payload.data[action.payload.modulo]
                    }
                }
                return value
            })
            state.payload.push({[action.payload.modulo]:action.payload.data})
            return {
                loading: false,
                payload: data.length > 0 ? [...state.payload] : [...state.payload],
                error: ''
            }
        case Const.ObtenerDatosFailed:
            var data = state.payload.filter(valor => {
                return valor[action.payload.modulo]
            })
            state.payload.map((value, i) => {

                if (value[action.payload.modulo]) {
                    if (action.payload.status === 402) {
                        state.payload.slice(value, i)
                    }
                }
                return value
            })
            return {
                loading: false,
                payload: [...state.payload],
                error: action.payload
            }
        case Const.MensajeDatosAction:
            return {
                ...state,
                loading: false,
                mensaje: action.payload.data,
                error: ''
            }
        case Const.MensajeDatosFailed:
            return {
                ...state,
                loading: false,
                mensaje: '',
                error: action.payload
            }
        case Const.EliminarerroresData:
            return {
                ...state,
                loading: false,
                mensaje: '',
                error: ""
            }
        default:
            return state
    }
}
export default DatosReducer;
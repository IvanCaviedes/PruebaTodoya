
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

function configureStore(state = {}) {
    const store = createStore(
        rootReducer,
        state,
        composeWithDevTools(
            applyMiddleware(
                reduxThunk,
            )
        )
    )
    return store;
}
export default configureStore;
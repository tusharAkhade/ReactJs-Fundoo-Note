import {createStore} from 'redux'
import navReducer, {updateNoteReducer} from './reducers/reducer'
import {combineReducers} from 'redux'

const mainReducer = combineReducers({
    navReducer,
    updateNoteReducer
})

const store = createStore(mainReducer)

export default store

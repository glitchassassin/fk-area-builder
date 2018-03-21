import { createStore } from 'redux'
import { reduxBatch } from '@manaflair/redux-batch'
import reducers from './reducers'

let store = createStore(reducers, reduxBatch)

export default store;
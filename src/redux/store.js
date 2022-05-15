import {combineReducers, createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {TopHeaderReducer} from './reducers/TopHeaderReducer'
// import {LoadingReducer} from './reducers/LoadingReducer'


const persistConfig = {
    key: 'root',
    storage,
    //blacklist: ['LoadingReducer']   // 黑名单那不需要持久化的状态
}

const reducer = combineReducers({  // combineReducers合并reducer
        TopHeaderReducer,
        // LoadingReducer,
    }
)

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {
    store,
    persistor
}

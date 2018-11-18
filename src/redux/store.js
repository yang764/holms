import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reduxReset from 'redux-reset'
import ReduxPromise from 'redux-promise';
import reducers from '../redux/reducers';

import rootSaga from '../redux/sagas';
import {persistReducer, persistStore } from 'redux-persist';
import { persistCombineReducers } from 'redux-persist'
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createEngine from 'redux-storage-engine-localstorage';
import * as ReduxStorage from 'redux-storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {Map, Record} from 'immutable';
import immutableTransform from 'redux-persist-transform-immutable';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware, ReduxPromise];

let persistor;





const persistConfig = {
	transforms: [immutableTransform()],
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel1
}



const persistedReducer = persistCombineReducers(persistConfig, {
	...reducers,
	router: routerReducer
});


const loggerMiddleware = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
});



// const store = createStore(
// 	combineReducers({
// 		...reducers,
// 		router: routerReducer
// 	}),
//
// )i;

export default () => {
	let store = createStore(persistedReducer, compose(applyMiddleware(...middlewares),reduxReset()))
	sagaMiddleware.run(rootSaga);
	persistor = persistStore(store);
	return { store, history, persistor }
}

export function getPersistor() {
	return persistor;
}

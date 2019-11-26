import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import comReducer from "../reducers/combineReducers";

export default function storeConfig() {
	
	const sagaMiddleware = createSagaMiddleware();
	const logger = createLogger();
	
	return{
		
		...createStore(comReducer, applyMiddleware(logger, sagaMiddleware)),
		runSaga: sagaMiddleware.run
		
	}
	
}
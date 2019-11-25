import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/Reducer";

export default function storeConfig() {
	
	const sagaMiddleware = createSagaMiddleware();
	const logger = createLogger();
	
	return{
		
		...createStore(rootReducer, applyMiddleware(logger, sagaMiddleware)),
		runSaga: sagaMiddleware.run
		
	}
	
}
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from './toDoListReducer';
import staffReducer from './staffReducer';
import testReducer from './testReducer';
import testTwoReducer from './testTwoReducer';
import thunkMiddleware from 'redux-thunk';
import requestReducer from './requestReducer';

let rootReducer = combineReducers({
    app: appReducer,
    staffList: staffReducer,
    test: testReducer,
    testTwo: testTwoReducer,
    request: requestReducer,
    form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default appReducer
import { combineReducers } from 'redux';
import todos from './reducers/todos';

const ReduxApp = combineReducers({
  todos
});

export default ReduxApp;

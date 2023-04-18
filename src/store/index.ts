import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
const useRootDispatch: () => RootDispatch = useDispatch;

export { useRootSelector, useRootDispatch };

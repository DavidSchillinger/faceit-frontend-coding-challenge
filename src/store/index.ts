import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers';
import { Actions } from '../actions/tournaments';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<{}, Actions>)
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
const useRootDispatch = () => useDispatch<RootDispatch>();

export { useRootSelector, useRootDispatch };

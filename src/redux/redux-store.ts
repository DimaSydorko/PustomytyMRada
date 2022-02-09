import { applyMiddleware, combineReducers, compose, createStore, Action } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import AdminAuthReducer from "./adminAuth-reducer";
import { firebaseReducer, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import firebase from "../Utils/firebase";

const rrfConfig = {
  userProfile: 'users'
}

const rootReducer = combineReducers({
  adminAuth: AdminAuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})

const initialState = {}
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer, 
  initialState, 
  composeEnhancers(
    compose(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({getFirebase})
      )
    )
  )
)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}
export default store

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>
export type InferActionsType<T> = T extends {[keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
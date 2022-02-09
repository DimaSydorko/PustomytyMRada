import { apiAdmin } from '../api/apiAdminAuth';
import { BaseThunkType, InferActionsType } from "./redux-store"

type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

let initialState = {   
  isAuth: false,
  loginError: '',
}

const AdminAuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_LOGIN_ERROR':
    case 'ENTER_ADMIN_PASSWORD':{
      return {
        ...state,
        ...action.payload,
      }
    }
    default: 
      return state
  }
}

export const actions = {
  setAuthUserData: (isAuth: boolean) => ({type: 'ENTER_ADMIN_PASSWORD', payload: {isAuth}} as const),
  setLoginError: (loginError: string) => ({type: 'SET_LOGIN_ERROR', payload: {loginError}} as const),
}

export const login = (email:string, password:string): ThunkType => async (dispatch) => {
  await apiAdmin.signIn(email, password, dispatch)
}

export const logout = () => {
  apiAdmin.signOut()
}

export const setIsAuth = (isAuth: boolean): ThunkType => async (dispatch) => {
  dispatch(actions.setAuthUserData(isAuth))
}

export default AdminAuthReducer
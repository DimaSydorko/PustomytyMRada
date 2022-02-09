import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/redux-store";

type MapPropsType = {
  isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.adminAuth.isAuth
} as MapPropsType)

export function WithAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
  
  
  const RedirectComponent: React.FC<MapPropsType> = (props) => {
    let {isAuth, ...restProps} = props

    if (!isAuth) return <Redirect to='/adminauth'/>
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectAuthRedirectComponent = 
    connect<MapPropsType, {}, WCP, AppStateType>(
    mapStateToPropsForRedirect, {}) 
  (RedirectComponent)
  
  return ConnectAuthRedirectComponent 
}
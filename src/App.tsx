import React from 'react'
import {compose} from 'redux'
import {useSelector} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Button} from "@mui/material";

import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import {logout} from "./redux/adminAuth-reducer";
import AdminLogin from "./Screens/AdminAuthScreen/login";
import {AppStateType} from './redux/redux-store'

const App = () => {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)
  return (
    <>
      {isAdmin && <Button variant="outlined" onClick={logout}>Log out</Button>}
      <div style={{margin: '24px 16px 0', overflow: 'hidden'}}>
        <Switch>
          <Route exact path='/admin' render={() => <AdminLogin/>}/>
          <Route path='*' render={() => <HomeScreen/>}/>
        </Switch>
      </div>
      <footer style={{textAlign: 'center'}}>MRada Pustomyty {new Date().getFullYear()}</footer>
    </>
  )
}

export default compose<React.ComponentType>(
  withRouter
)(App)
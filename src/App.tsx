import React from 'react'
import {compose} from 'redux'
import {useSelector} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {Button} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import {ThemeProvider} from "@mui/styles";

import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import {logout} from "./redux/adminAuth-reducer";
import AdminLogin from "./Screens/AdminAuthScreen/login";
import {AppStateType} from './redux/redux-store'
import {theme} from "./theme/theme";
import './App.scss';

const App = () => {
  const isAdmin = useSelector((state: AppStateType) => state.adminAuth.isAuth)

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isAdmin && <Button variant="outlined" onClick={logout}>Log out</Button>}
        <div style={{overflow: 'hidden'}}>
          <Switch>
            <Route exact path='/admin' render={() => <AdminLogin/>}/>
            <Route path='*' render={() => <HomeScreen/>}/>
          </Switch>
        </div>
        <footer style={{textAlign: 'center'}}>MRada Pustomyty {new Date().getFullYear()}</footer>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default compose<React.ComponentType>(
  withRouter
)(App)
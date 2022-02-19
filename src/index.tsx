import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {CssBaseline} from "@mui/material";
import store, {rrfProps} from './redux/redux-store'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <CssBaseline/>
        <App/>
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

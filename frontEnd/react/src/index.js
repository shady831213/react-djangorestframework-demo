import Login from './component/Login'
import {LoginForm} from './component/Login'
import UserStore from './store/UserStore'
import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {indigo500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

const loginForm = new LoginForm();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500
    }
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Login store={UserStore} form={loginForm}/>
    </MuiThemeProvider>,

document.getElementById('root')
)
;

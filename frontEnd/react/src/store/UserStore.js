import {action, useStrict, extendObservable} from 'mobx';
import 'whatwg-fetch'

useStrict(true);


// const AUTH_USER = 'auth_user';
// const SENT_AUTH = 'sent_auth';
// const UNAUTH_USER = 'unauth_user';
// const AUTH_ERROR = 'auth_error';


class UserStore {
    constructor() {
        extendObservable(this, {
            error: '',
            authenticated: false,
            isAuthenticating: false
        })
    }

    @action
    userLogin({username, password}) {
        const init = {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }};
        alert(JSON.stringify(init));
        this.isAuthenticating = true;
        fetch('/api/token/', init)
            .then(action('parse_repsonse',(response)=>{
                return response.json();
            }))
            .then(action('async_fetch_tokens',(data)=>{
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refeshToken', data.refresh);
                alert(localStorage.getItem('accessToken'));
                this.authenticated = true;
                this.isAuthenticating = false;
            }));
    }

}

export default new UserStore()
import React, {Component} from 'react';
// import DevTools from 'mobx-react-devtools';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField} from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import {observer} from 'mobx-react';
import validatorjs from 'validatorjs'
import MobxReactForm from 'mobx-react-form'
import _ from 'lodash';
import UserStore from '../store/UserStore'


export class LoginForm extends MobxReactForm {
    plugins() {
        return {dvr: validatorjs};
    }

    setup() {
        return {
            fields: [{
                name: 'username',
                rules: 'required|string|between:5,25',
                value: '',
                options: {
                    floatingLabelText: 'Username',
                    hintText: 'Enter username',
                }
            }, {
                name: 'password',
                rules: 'required|string|between:5,25',
                value: '',
                options: {
                    type: 'password',
                    floatingLabelText: 'Password',
                    hintText: 'Enter password',
                }
            }],
        };
    }

    hooks() {
        return {
            onSuccess(form) {
                // get field values
                UserStore.userLogin(form.values());
                console.log('Form Values!', form.values());
            },
            onError(form) {
                // get all form errors
                console.log('All form errors', form.errors());
            }
        };
    }
}

@observer
export default class Login extends Component {

    renderField(value, field) {
        return (
            <TextField
                name={field}
                key={field}
                onChange={this.props.form.select(field).onChange}
                {...this.props.form.select(field).options}
                errorText={this.props.form.select(field).error}
            />
        );
    }

    render() {
        let wrapperClass = 'login-wrapper';
        if (this.props.store.error) {
            wrapperClass += ' login-err-animation';
            setTimeout(() => {
                this.wrapper.classList.remove('login-err-animation');
            }, 3000)
        }
        let submitProps = {};
        if (this.props.store.isAuthenticating) {
            submitProps = {
                disabled: true,
                icon: <CircularProgress size={30}/>,
                labelPosition: 'before'
            }
        }
        return (
            <div ref={(input) => this.wrapper = input} className={wrapperClass}>
                <Card>
                    <form className="login-form" onSubmit={this.props.form.onSubmit}>
                        <h2>Welcome!</h2><br/>
                        <hr className="colorgraph"/>
                        {_.map(this.props.form.get(), this.renderField.bind(this))}
                        {<div className="error-message"> {this.props.store.error} </div>}
                        <RaisedButton {...submitProps} className="login-button" type="submit" label="Login"
                                      primary={true}/>
                    </form>
                </Card>
                {/*<DevTools/>*/}
            </div>
        );
    }
}


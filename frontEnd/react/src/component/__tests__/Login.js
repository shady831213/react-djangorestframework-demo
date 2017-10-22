import React from 'react';
import Enzyme , {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../Login';
import {LoginForm} from '../Login'
import UserStore from '../../store/UserStore'

global.requestAnimationFrme = function(callback) {
    setTimeout(callback, 0);
};

Enzyme.configure({adapter: new Adapter()});

describe('<Login />', () => {
    let wrapper = null;
    const loginForm = new LoginForm();
    beforeEach(() => {
        let root = mount(
            <MuiThemeProvider>
                <Login store={UserStore} form={loginForm}/>
            </MuiThemeProvider>);

        wrapper = root.find(Login);
    });

    it('has username, password and submit button', () => {

        const username = wrapper.find('input[name="username"]');
        const password = wrapper.find('input[name="password"][type="password"]');
        const submit = wrapper.find('button[type="submit"]');
        wrapper.debug(username);
        expect(username && password && submit).toBeTruthy();
    });

    // describe('field validations', () => {
    //     const invalidRegex = /invalid/i;
    //     const requiredRegex = /required/i;
    //     const match = regex => wrapper.html().match(regex);
    //     let email = null;
    //     let password = null;
    //
    //     beforeEach(() => {
    //         email = wrapper.find('input[name="email"]');
    //         password = wrapper.find('input[name="password"][type="password"]');
    //     });
    //
    //     it('should output error message for invalid email', () => {
    //         email.simulate('change', {target: {value: 'not-an-email'}});
    //         email.simulate('blur');
    //         expect(match(invalidRegex)).toBeTruthy();
    //     });
    //
    //     it('should not output error message for valid email', () => {
    //         email.simulate('change', {target: {value: 'pedropb@i2x.ai'}});
    //         email.simulate('blur');
    //         expect(match(invalidRegex)).toBeFalsy();
    //     });
    //
    //     it('should output required message for empty email', () => {
    //         email.simulate('change', {target: {value: ''}});
    //         email.simulate('blur');
    //         expect(match(requiredRegex)).toBeTruthy();
    //     });
    //
    //     it('should not output required message for any email', () => {
    //         email.simulate('change', {target: {value: 'aaaaaa'}});
    //         email.simulate('blur');
    //         expect(match(requiredRegex)).toBeFalsy();
    //     });
    //
    //     it('should output required message for empty password', () => {
    //         password.simulate('change', {target: {value: ''}});
    //         password.simulate('blur');
    //         expect(match(requiredRegex)).toBeTruthy();
    //     });
    //
    //     it('should not output required message for any password', () => {
    //         password.simulate('change', {target: {value: 'aaaaaa'}});
    //         password.simulate('blur');
    //         expect(match(requiredRegex)).toBeFalsy();
    //     });
    // });

});

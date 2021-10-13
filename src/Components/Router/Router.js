import React from 'react'
import { Provider } from 'react-redux';
import store from '../../redux-service/store';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from '../SignUpPage/SignUpPage'
import SignIn from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'

function RouterDom() {
    return (
        <div>
            <Provider store={store}>
            <BrowserRouter >
                <Switch>
                    <Route exact path='/' component={SignUp} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
            </BrowserRouter>
            </Provider>
        </div>
    )
}

export default RouterDom

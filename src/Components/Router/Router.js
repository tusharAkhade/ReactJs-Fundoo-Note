import React from 'react'
import { Provider } from 'react-redux';
import store from '../../redux-service/store';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from '../SignUpPage/SignUpPage'
import SignIn from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';

function RouterDom() {
    return (
        <div>
            <Provider store={store}>
            <BrowserRouter >
                <Switch>
                    <Route exact path='/' component={SignUp} />
                    <AuthRoute path='/signin' component={SignIn} />
                    <ProtectedRoute path='/dashboard' component={Dashboard} />
                    <Route path='*' component={() => <h1> 404 page not found </h1>} />
                </Switch>
            </BrowserRouter>
            </Provider>
        </div>
    )
}

export default RouterDom

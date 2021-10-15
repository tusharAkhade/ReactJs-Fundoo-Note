import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import AdvertiseSVG from '../assets/AdvertiseImage';
import './SignUpPage_style.css'
import { Checkbox, FormControl, FormControlLabel, Button } from '@material-ui/core';
import { signup } from '../service/userservice'

const firstNameRegEx = /^[A-Z]{1}[a-z]{2,}$/;
const lastNameRegEx = /^[A-Z]{1}[a-z]{2,}$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=[^!@#$%^&+=]*[!@#$%^&+=][^!@#$%^&+=]*$)(?=.*[0-9]).{8,}$/

class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,

            errorFirstName: false,
            errorLastName: false,
            errorEmail: false,
            errorPassword: false,
            errorConfirmPassword: false,

            helperTextFirstName: '',
            helperTextLastName: '',
            helperTextEmail: 'You can use letters, numbers & periods',
            helperTextPassword: 'Use 8 or more characters with a mix of letters, numbers & symbols',
            helperTextConfirmPassword: ''
        }
    }

    takeFirstName = event => {
        this.setState({
            firstName: event.target.value
        })
    }

    takeLastName = event => {
        this.setState({
            lastName: event.target.value
        })
    }

    takeEmail = event => {
        this.setState({
            email: event.target.value
        })
    }

    takePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    takeConfirmPassword = event => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleSignInClick = () => {
        this.props.history.push("/signin")
    }

    submit = () => {

        let firstNameCheck = firstNameRegEx.test(this.state.firstName)
        let lastNameCheck = lastNameRegEx.test(this.state.lastName)
        let emailCheck = emailRegex.test(this.state.email)
        let passwordCheck = passwordRegEx.test(this.state.password)

        if (firstNameCheck == true) {
            this.setState({
                errorFirstName: false,
                helperTextFirstName: ''
            })
        } else {
            this.setState({
                errorFirstName: true,
                helperTextFirstName: 'Incorrect input'
            })
        }

        if (lastNameCheck == true) {
            this.setState({
                errorLastName: false,
                helperTextLastName: ''
            })
        } else {
            this.setState({
                errorLastName: true,
                helperTextLastName: 'Incorrect input'
            })
        }

        if (emailCheck == true) {
            this.setState({
                errorEmail: false,
                helperTextEmail: ''
            })
        } else {
            this.setState({
                errorEmail: true,
                helperTextEmail: 'Incorrect input'
            })
        }

        if (passwordCheck == true) {
            this.setState({
                errorPassword: false,
                helperTextPassword: ''
            })
        } else {
            this.setState({
                errorPassword: true,
                helperTextPassword: 'Incorrect input'
            })
        }

        if (this.state.password == this.state.confirmPassword && this.state.confirmPassword != '') {
            this.setState({
                errorConfirmPassword: false,
                helperTextConfirmPassword: ''
            })
        } else if (this.state.password != '') {
            this.setState({
                errorConfirmPassword: true,
                helperTextConfirmPassword: 'Password not match'
            })
        }

        if (firstNameCheck == true && lastNameCheck == true && emailCheck == true && passwordCheck == true) {
            let obj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                service: "advance",
                email: this.state.email,
                password: this.state.password
            }
            signup(obj).then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                    this.props.history.push("/signin")
                }
            })
        }
    }

    render() {
        return (
            <div className="signup-container">
                <div className="signup-details-and-advertise-container">

                    <div className="signup-details">

                        <div className="signUpLogo">
                            <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="l5Lhkf"><g id="qaEJec"><path fill="#ea4335" d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"></path></g><g id="YGlOvc"><path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path></g><g id="BWfIk"><path fill="#4285f4" d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"></path></g><g id="e6m3fd"><path fill="#fbbc05" d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"></path></g><g id="vbkDmc"><path fill="#ea4335" d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"></path></g><g id="idEJde"><path fill="#4285f4" d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"></path></g></svg>
                        </div>
                        <div className="signUpText">
                            <div className="signup-text1">Create your Google Account</div>
                            <div className="signup-text2">to continue to Gmail</div>
                        </div>

                        <div className="row1">
                            <TextField className="name-text" size='small' label="First name" helperText={this.state.helperTextFirstName} error={this.state.errorFirstName} variant="outlined" onChange={this.takeFirstName} />
                            <TextField className="name-text" size='small' label="Last name" helperText={this.state.helperTextLastName} error={this.state.errorLastName} variant="outlined" onChange={this.takeLastName} />
                        </div>

                        <TextField className="username-text" size='small' id="" label="Username" helperText={this.state.helperTextEmail} error={this.state.errorEmail} variant="outlined" onChange={this.takeEmail} />

                        <div className="row2">
                            <TextField className="password-text" type={this.state.showPassword ? 'text' : 'password'} style={{ marginRight: "10px" }} size='small' id="" label="Password" helperText={this.state.helperTextPassword} error={this.state.errorPassword} variant="outlined" onChange={this.takePassword} />
                            <TextField className="confirm-password-text" type={this.state.showPassword ? 'text' : 'password'} size='small' id="" label="Confirm" helperText={this.state.helperTextConfirmPassword} error={this.state.errorConfirmPassword} variant="outlined" onChange={this.takeConfirmPassword} />
                        </div>

                        <div style={{width:"100%"}}>
                            <FormControl className="checkBox-container">
                                <FormControlLabel className="checkbox" label="Show password" onClick={this.handleClickShowPassword} control={<Checkbox color="primary" />} />
                            </FormControl>
                        </div>
                        <div className="row3">
                            <div className="signInPageBtn" onClick= {this.handleSignInClick}>Sign in instead</div>
                            <div className="SignUpBtnContainer">
                                <Button className="next-btn" variant="contained" size="medium" color="primary" style={{ marginTop: "10px", width: "100px", height: "50px" }} onClick={this.submit}> Next </Button>
                            </div>
                        </div>
                    </div>

                    <div className="advertise-container">
                        <AdvertiseSVG />
                        <p className="AdvertiseSVG-text">One account. All of Google working for you.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp

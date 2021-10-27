import React, { useState, useEffect } from 'react'
import './Navbar_style.css'
import { connect } from 'react-redux'
import { ClickAwayListener, Popper } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

function Navbar(props) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const handleProfileClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleSignOutClick = () => {
        localStorage.removeItem('fundooToken')
        history.push('/signin')
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    useEffect(() => {
        console.log(props)
    }, [props])
    return (
        <React.Fragment>
            <div className="fundoo-navbar-container">
                <div className="fundoo-navbar-item1">
                    <div className="fundoo-navbar-item1-1" >
                        <svg focusable="false" viewBox="0 0 24 24">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                        </svg>
                    </div>
                    <div className="fundoo-navbar-item1-2">
                        <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x " alt="" aria-hidden="true" style={{ width: "40px", height: "40px" }}></img>
                        <span>{props.changeText}</span>
                    </div>
                </div>

                <div className="fundoo-navbar-item2">
                    <div className="fundoo-navbar-item2-1">
                        <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                            <path d="M0,0h24v24H0V0z" fill="none"></path>
                        </svg>
                    </div>
                    <div className="fundoo-navbar-item2-2">
                        <input className="fundoo-navbar-item2-2-input" type="text" placeholder="Search" />
                    </div>
                </div>

                <div className="fundoo-navbar-item3">
                    <div className="fundoo-navbar-item3-icon" id="fundoo-navbar-item3-1"></div>
                    <div className="fundoo-navbar-item3-icon" id="fundoo-navbar-item3-2"></div>
                    <div className="fundoo-navbar-item3-icon" id="fundoo-navbar-item3-3"></div>
                    <div className="fundoo-navbar-item4-icon" id="fundoo-navbar-item4-1">
                        <svg class="gb_Ve" focusable="false" viewBox="0 0 24 24">
                            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                        </svg>
                    </div>
                    <div className="fundoo-navbar-item4-icon" id="fundoo-navbar-item4-2" onClick={handleProfileClick}></div>
                    <Popper click style={{ boxShadow: "1px 1px 5px grey", boxSizing: "border-box", backgroundColor: "#fff", border: "2px solid white", zIndex:"20", width: "200px", borderRadius: "3px", height: "100px" }} id={id} open={open} anchorEl={anchorEl}>
                        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                            <div className="popperContainer">
                                <div className="popperBtnContainer" onClick={handleSignOutClick}>
                                    <div className="popperBtn">Sign out</div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        changeText: state.navReducer.clicked
    }
}

export default connect(mapStateToProps)(Navbar)




import React from 'react'
import './TakeNoteOne_style.css'

function TakeNoteOne(props) {
    const openNoteTwo = () => {
        props.listenToTakeNoteOne(true)
    }
    return (
        <div className="takeNoteOneContainer" onClick={openNoteTwo}>
            <p className="takeNoteOneContainer-para">Take a note...</p>
            <div className="icons"> 
                <div className="icon" id="icon1"></div>
                <div className="icon" id="icon2"></div>
                <div className="icon" id="icon3"></div>
            </div>
        </div>
    )
}


export default TakeNoteOne

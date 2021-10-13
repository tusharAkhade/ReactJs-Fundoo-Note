import React from 'react'
import MiniDrawer from '../Drawer'
import Navbar from '../Navbar/Navbar'
import { getNotes } from '../service/DataService'
import TakeNoteOne from '../TakeNoteOne/TakeNoteOne'
import TakeNoteTwo from '../TakeNoteTwo/TakeNoteTwo'
import ViewNote from '../ViewNotes/ViewNote'
import './Dashboard_style.css'

function Dashboard() {
    const [openNote, setOpenNote] = React.useState(false)
    const [noteArray, setNoteArray] = React.useState([])

    const listenToTakeNoteOne = data => {
        if (data == true) {
            setOpenNote(true)
        } else {
            setOpenNote(false)
        }
    }  
    
    React.useEffect(() => {
        getNotes().then((res)=> {
            let filteredData = res.filter( data => data.isArchived == false && data.isDeleted == false )
            setNoteArray(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const listenToDrawer = (data) => {
        if(data == "trash") {
            getNotes().then((res)=> {
                let filteredData = res.filter( data => data.isDeleted == true )
                setNoteArray(filteredData)
            }).catch((err) => {
                console.log(err)
            })
        }
        else if(data == "archive") {
            getNotes().then((res)=> {
                let filteredData = res.filter( data => data.isArchived == true && data.isDeleted == false )
                setNoteArray(filteredData)
            }).catch((err) => {
                console.log(err)
            })
        }
        else if (data == "notes") {
            getNotes().then((res)=> {
                let filteredData = res.filter( data => data.isArchived == false && data.isDeleted == false )
                setNoteArray(filteredData)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return(
        <div className="NoteContainer">
            <div className="navbarComponent"> 
                <Navbar />
            </div>

            <div className="sectionContainer">
        
                <div className="sidebarContainer">
                    <div className="sidebarContent">
                        <MiniDrawer listenToDrawer={listenToDrawer} />
                    </div>
                </div>

                <div className="sectionNoteContainer">
                    <div className="navbarTakeNote">
                        {
                            openNote == false ? <TakeNoteOne listenToTakeNoteOne= {listenToTakeNoteOne} /> : <TakeNoteTwo listenToTakeNoteOne= {listenToTakeNoteOne}/>
                        }
                    </div>

                    <div className="displayNoteContainer">
                        {
                            noteArray.map((note)=> <ViewNote note={note} /> )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Dashboard


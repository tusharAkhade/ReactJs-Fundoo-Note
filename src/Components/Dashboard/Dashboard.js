import React from 'react'
import { connect } from 'react-redux'
import MiniDrawer from '../Drawer'
import Navbar from '../Navbar/Navbar'
import { getNotes } from '../service/DataService'
import TakeNoteOne from '../TakeNoteOne/TakeNoteOne'
import TakeNoteTwo from '../TakeNoteTwo/TakeNoteTwo'
import ViewNote from '../ViewNotes/ViewNote'
import './Dashboard_style.css'

function Dashboard(props) {
    const [openNote, setOpenNote] = React.useState(false)
    const [filterNoteArray, setFilterNoteArray] = React.useState([])

    const listenToTakeNoteOne = data => {
        if (data == true) {
            setOpenNote(true)
        } else {
            setOpenNote(false)
        }
    }

    React.useEffect(() => {
        getUnarchiveUntrashNotes()
    }, [])

    const getTrashNotes = () => {
        getNotes().then((res) => {
            let filteredData = res.filter(data => data.isDeleted == true)
            setFilterNoteArray(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getArchiveNotes = () => {
        getNotes().then((res) => {
                let filteredData = res.filter( data => data.isArchived == true && data.isDeleted == false )
            setFilterNoteArray(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getUnarchiveUntrashNotes = () => {
        getNotes().then((res) => {
            let filteredData = res.filter(data => data.isArchived == false && data.isDeleted == false)
            setFilterNoteArray(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }

    const listenToDrawer = (data) => {
        if (data == "trash") {
            getTrashNotes()
        }
        else if (data == "archive") {
            getArchiveNotes()
        }
        else if (data == "notes") {
            getUnarchiveUntrashNotes()
        }
    }

    return (
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
                    <div className={(props.noteType == "Archive" || props.noteType == "Bin") ? "hideTakeNote" : "navbarTakeNote"}>
                        {
                            openNote == false ? <TakeNoteOne listenToTakeNoteOne={listenToTakeNoteOne} /> : <TakeNoteTwo getTrashNotes={getTrashNotes} getArchiveNotes={getArchiveNotes} getUnarchiveUntrashNotes={getUnarchiveUntrashNotes} listenToTakeNoteOne={listenToTakeNoteOne} />
                        }
                    </div>
                    <div className="displayNoteContainer">
                        {
                            filterNoteArray.map((note) => <ViewNote getTrashNotes={getTrashNotes} getArchiveNotes={getArchiveNotes} getUnarchiveUntrashNotes={getUnarchiveUntrashNotes} note={note} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        noteType: state.clicked
    }
}

export default connect(mapStateToProps)(Dashboard)


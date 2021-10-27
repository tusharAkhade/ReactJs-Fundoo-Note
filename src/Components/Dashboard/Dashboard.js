import React ,{ useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import MiniDrawer from '../Drawer'
import Navbar from '../Navbar/Navbar'
import { getNotes } from '../service/DataService'
import TakeNoteOne from '../TakeNoteOne/TakeNoteOne'
import TakeNoteTwo from '../TakeNoteTwo/TakeNoteTwo'
import ViewNote from '../ViewNotes/ViewNote'
import './Dashboard_style.css'

function Dashboard(props) {
    const [openNote, setOpenNote] = useState(false)
    const [filterNoteArray, setFilterNoteArray] = useState([])

    const listenToTakeNoteOne = data => {
        if (data == true) {
            setOpenNote(true)
        } else {
            setOpenNote(false)
        }
    }

    useEffect(() => {
        console.log(props)
        if (props.noteType == "Keep" || props.noteType == "Note") {
            getUnarchiveUntrashNotes()
        }
        else if (props.noteType == "Archive") {
            getArchiveNotes()
        }
        else if (props.noteType == "Bin") {
            getTrashNotes()
        }
    }, [props.noteType, props.updateNote])

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
            let filteredData = res.filter(data => data.isArchived == true && data.isDeleted == false)
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

    return (
        <div className="NoteContainer">
            <div className="navbarComponent">
                <Navbar />
            </div>
            <div className="sectionContainer">
                <div className="sidebarContainer">
                    <div className="sidebarContent">
                        <MiniDrawer />
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
        noteType: state.navReducer.clicked,
        updateNote: state.updateNoteReducer
    }
}

export default connect(mapStateToProps)(Dashboard)


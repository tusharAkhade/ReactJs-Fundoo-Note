import React, { useState } from 'react'
import Icons from '../Icons/Icons'
import './ViewNotes_style.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import { addArchiveNotes, deleteRestoreNotes, updateNoteColor, updateNotes } from '../service/DataService';
import Chip from '@mui/material/Chip';

function ViewNote({note}) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)
    const [color, setColor] = useState('#fff')

    const handleNoteClick = () => {
        console.log("Click on note");
        console.log(note.id)
        setOpen(true)
    }

    const handleCloseBtnEvent = () => {

        let obj = {
            noteId: note.id,
            title: title,
            description: description,
        }

        if (title != '' || description != '') {
            updateNotes(obj)
        }
        setOpen(false)
    }

    const takeTitle = (event) => {
        setTitle(event.target.value)
        console.log(title)
    }

    const takeDescription = (event) => {
        setDescription(event.target.innerText)
        console.log(description)
    }

    const changeColor = (data) => {
        console.log(data)
        setColor(data)
        console.log(color)
        let obj = {
            noteIdList: [note.id],
            color: data,
        }
        updateNoteColor(obj)
    }

    let archiveNote = () => {
        let obj = {
            noteIdList: [note.id],
            isArchived: !note.isArchived,
        }
        addArchiveNotes(obj).then((res) => console.log(res))
    }

    let deletedNote = () => {
        console.log(note.isDeleted)
        let obj = {
            noteIdList: [note.id],
            isDeleted: true,
        }
        deleteRestoreNotes(obj)
    }

    let restoreNote = () => {
        let obj = {
            noteIdList: [note.id],
            isDeleted: false,
        }
        deleteRestoreNotes(obj)
    }


    return (
        <React.Fragment>
            <div className="noteItem" style={{ backgroundColor: note.color }} >
                <div className="note" onClick={handleNoteClick}>
                    <div className="noteTitleContainer"> {note.title} </div>
                    <div className="noteDescContainer"> {note.description} </div>
                </div>
                {
                    (note.collaborators.length >= 1 || note.reminder.length >= 1 ) &&
                    <div className="collabImageOnNote2Container" style={{cursor:"default", display:"flex", flexWrap:"wrap"}}>
                    {
                        note.collaborators.map(() => <div style={{cursor:"pointer"}} className="collabImageOnNote2"></div>)
                    }

                    {
                        note.reminder.map((date)=><div className="viewReminder"> <Chip style={{width:"100%", fontWeight: "bold",}} icon={<ScheduleOutlinedIcon />} label={date} /> </div>)
                    }
                    </div>
                }
                <div className="noteIcon">
                    <Icons name="ViewNote" actionType="UpdateNote" type="displayNotes" getColor={changeColor} restoreNote={restoreNote} deletedNote={deletedNote} archiveNote={archiveNote} close={handleCloseBtnEvent} />
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ backgroundColor: note.color }}>
                        <input className="row1OfNote2" defaultValue={note.title} placeholder="Title" type="text" onChange={takeTitle} />
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: note.color }}>
                        <DialogContentText id="alert-dialog-description">
                            <div role="textbox" type="text" className="row2OfNote2" data-placeholder="Take a note..." contenteditable="true" onInput={takeDescription} > {note.description} </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: note.color }}>
                        <div className="row3OfNote2">
                            <Icons name="ViewNote" actionType="UpdateNote" type="displayNote" getColor={changeColor} restoreNote={restoreNote} deletedNote={deletedNote} archiveNote={archiveNote} close={handleCloseBtnEvent} />
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    )
}

export default ViewNote

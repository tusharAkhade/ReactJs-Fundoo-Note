import React, { useContext, useState } from 'react'
import './Icons_style.css'
import ColorPopper from '../ColorPopper'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Popper from '@material-ui/core/Popper';
import { ActionContext } from '../TakeNoteTwo/TakeNoteTwo'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { connect } from 'react-redux';

function Icons(props) {

    const action = useContext(ActionContext)
    const [openCollab, setopenCollab] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    let handleArchiveClick = () => {
        if (props.name == "ViewNote") {
            props.archiveNote()
        }
        else if (props.name == "TakeNoteTwo") {
            props.archive(true)
            console.log(props.name)
        }
    }

    let handleDeleteClick = () => {
        if (props.name == "ViewNote") {
            props.deletedNote()
        }
    }

    let handleRestoreClick = () => {
        props.restoreNote()
    }

    const listenToCollab = () => {
        if (props.name == "TakeNoteTwo") {
            setopenCollab(!openCollab)
            props.listenToCollaborator(openCollab)
        } else if (props.name == "ViewNote") {
            console.log("View Note")
        }
    }

    const handleReminderClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleReminderSaveClick = (event) => {
        if (props.name == "TakeNoteTwo") {
            props.getReminder(`${value.toDateString()}, ${value.getHours()}:${value.getMinutes()}`)
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <React.Fragment>

            <div className="noteTwoIcon">
                <div className={props.type == "displayNotes" ? "iconOfDisplayNotes" : "multipleIconsOfNote2"}>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "hideIcon" : "iconOfNote2-1"} onClick={handleReminderClick} ></div>
                    <Popper click style={{ boxShadow: "1px 1px 5px grey", backgroundColor: "#fff", border: "2px solid white", width: "300px", borderRadius: "3px", height: "200px" }} id={id} open={open} anchorEl={anchorEl}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField style={{ margin: "10px" }} {...params} />}
                            />
                            <TimePicker
                                label="Time"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField style={{ margin: "10px" }} {...params} />}
                            />
                        </LocalizationProvider>
                        <button onClick={handleReminderSaveClick} style={{ width: "70px", height: "30px", margin: "10px" }}>Save</button>
                    </Popper>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "hideIcon" : "iconOfNote2-2"} onClick={listenToCollab} ></div>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "hideIcon" : "iconOfNote2-3"}> <ColorPopper className="iconOfNote2" getColor={props.getColor} /> </div>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "hideIcon" : "iconOfNote2-4"}></div>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "hideIcon" : "iconOfNote2-5"} onClick={handleArchiveClick} ></div>
                    <div className="iconOfNote2" id={props.type == "removeDeleteIconFromNoteTwoIcons" ? "hideIcon" : "iconOfNote2-6"} onClick={handleDeleteClick} >
                        <DeleteOutlineOutlinedIcon />
                    </div>
                    <div className="iconOfNote2" id={props.type == "displayNotes" ? "iconOfDisplayNotes2-7" : "iconOfNote2-7"}></div>
                    <div className="iconOfNote2" id={props.type == "displayNotes" ? "iconOfDisplayNotes2-8" : "iconOfNote2-8"}></div>
                    <div className="iconOfNote2" id={props.noteType == "Bin" ? "viewRestoreIcon" : "hideIcon"} onClick={handleRestoreClick}> <RestoreFromTrashIcon /> </div>
                </div>
                <div className="closeBtnContainer">
                    <div className={props.type == "displayNotes" ? "closeButtonIconOfDisplayNotes2" : "closeButtonIconOfNote2"} role="button" onClick={props.close}> Close </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        noteType: state.clicked
    }
}

export default connect(mapStateToProps)(Icons)

import React, { useState } from 'react'
import { ClickAwayListener, Popper } from '@material-ui/core'
import './TakeNoteTwo_style.css'
import Icons from '../Icons/Icons'
import { makeStyles } from '@material-ui/core/styles';
import { addNotes, getEmailMatch, getNotes } from '../service/DataService'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

const action = {
    create: "CreateNote"
}

const useStyles = makeStyles((theme) => ({

    PopperContainer: {
        // border: "10px solid red",
        border: "1px solid black",
        borderRadius: "3px",
        width: "100%",
        minHeight: "100px",
        overflowY: "scroll",
        overflowX: "scroll",
        maxHeight: "200px",
        "&::-webkit-scrollbar" : {
            display: "none",
        },
    }

}));

export const ActionContext = React.createContext(action.create)

function TakeNoteTwo(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isArchived, setIsArchived] = useState(false)
    const [color, setColor] = useState('#fff')
    const [input, setInput] = useState('')
    const [openCollab, setopenCollab] = useState(false)
    const [matchingUsers, setMatchingUsers] = useState([])
    const [allCollaberators, setallCollaberators] = useState([])
    const [reminder, setReminder] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();


    const handleClickAwayEvent = () => {
        console.log(allCollaberators)
        console.log(JSON.stringify(allCollaberators))
        if (title != '') {
            const data = new FormData()
            data.append("title", title)
            data.append("description", description)
            data.append("color", color)
            data.append("isArchived", isArchived)
            data.append("collaberators", JSON.stringify(allCollaberators))
            data.append("reminder", reminder )

            addNotes(data)
            .then(res => {
                console.log(res)
                props.getUnarchiveUntrashNotes()
            })
        }
        props.listenToTakeNoteOne(false)
    }

    const takeTitle = (event) => {
        setTitle(event.target.value)
        console.log(event.target.value)
    }

    const takeDescription = (event) => {
        setDescription(event.target.innerText)
        console.log(event.target.innerText)
        console.log(event.target)
    }

    const archive = (data) => {
        setIsArchived(data)
        console.log(isArchived)
    }

    const getColor = (data) => {
        console.log(data)
        setColor(data)
    }

    const getReminder = (data) => {
        setReminder(data)
    }

    const handleChangeInput = (event) => {
        setInput(event.target.value)
        console.log(input)
        let obj = {
            searchWord: input
        }
        getEmailMatch(obj).then(matchingInfo => {
            console.log(matchingInfo)
            let matchedInfo = matchingInfo.map(info => info)
            setMatchingUsers(matchedInfo)
            setAnchorEl(event.target)
        })

    }

    const listenToCollaborator = (data) => {
        console.log(data)
        setopenCollab(data)
        console.log(openCollab)
    }

    const handleCollabSelectClick = (event) => {
        console.log(event.target.innerText)
        let obj = matchingUsers.find((user)=> user.email == event.target.innerText)
        console.log(obj)
        allCollaberators.push(obj)
        console.log(allCollaberators)
        setAnchorEl(null)
    }

    const handleClickCloseCollab = () => {
        setopenCollab(false)
    }

    const handleClickSaveCollab = () => {
        console.log("hello")
        setopenCollab(false)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <ClickAwayListener onClickAway={handleClickAwayEvent}>

                {
                    openCollab ?
                        <div className="takeNoteTwoCollabContainer">
                            <div className="takeNoteTwoContainer">
                                <div className="collaboratorHeading">Collaborators <hr /> </div>
                                <div className="ownerInfo">
                                    <div className="ownerImg"></div>
                                    <div className="ownerNameAndEmail">
                                        <div className="ownerName">Tushar Akhade <span>(Owner)</span> </div>
                                        <div className="ownerEmail">tusharakhade10@gmail.com</div>
                                    </div>
                                </div>
                                <div className="collaboratorsInfo">                                    
                                    {
                                        (allCollaberators.length >= 1) &&
                                        allCollaberators.map( obj => <div className="singleCollaborator">
                                        <div className="collaboratorImg addedCollabImage"></div>
                                        <div className="collaboratorEmail"> {obj.email} </div>
                                        </div> )
                                    }
                                    <div className="addCollaborator">
                                        <div className="collaboratorImg"></div>
                                        <input className="collaboratorEmail" onChange={handleChangeInput} placeholder="Person or email to share with" />
                                    
                                        <Popper id={id} open={open} placement="bottom-start" transition anchorEl={anchorEl}>
                                            <div className={classes.PopperContainer}>
                                                {
                                                    matchingUsers.map( info => <div onClick={handleCollabSelectClick} style={{borderBottom:"1px solid black", padding: "5px", backgroundColor: "white", cursor:"default",}}> {info.email} </div> )
                                                }
                                            </div>
                                        </Popper>
                                        
                                    </div>
                                </div>

                                <div className="collabButtons">
                                    <div className="closeBtn" onClick={handleClickCloseCollab}>Close</div>
                                    <div className="saveBtn" onClick={handleClickSaveCollab}>Save</div>
                                </div>
                            </div>
                        </div>

                        :

                        <div className="takeNoteTwoMainContainer" >
                            <div className="takeNoteTwoContainer" style={{ backgroundColor: color }}>
                                <input className="row1OfNote2" placeholder="Title" type="text" onChange={takeTitle} />
                                <div role="textbox" className="row2OfNote2" data-placeholder="Take a note..." contenteditable="true" onInput={takeDescription}></div>
                                {
                                    (allCollaberators.length >= 1 || reminder.length >= 1 ) && 
                                    <div className="collabImageOnNote2Container">
                                    {
                                        allCollaberators.map(() => <div style={{cursor:"pointer"}} className="collabImageOnNote2"></div>)
                                    }
                                    {
                                        <div className="takeNoteTwoReminder"> <ScheduleOutlinedIcon /> {reminder}</div>
                                    }
                                    </div>
                                }
                                
                                <div className="row3OfNote2">
                                    <Icons name="TakeNoteTwo" type="removeDeleteIconFromNoteTwoIcons" listenToCollaborator={listenToCollaborator} getUnarchiveUntrashNotes={props.getUnarchiveUntrashNotes} actionType="CreateNote" getReminder={getReminder} getColor={getColor} archive={archive} close={handleClickAwayEvent} />
                                </div>
                            </div>
                        </div>
                }

        </ClickAwayListener>
    )
}

export default TakeNoteTwo

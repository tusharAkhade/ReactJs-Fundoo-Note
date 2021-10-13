import React, { useState } from 'react'
import { ClickAwayListener, Popper } from '@material-ui/core'
import './TakeNoteTwo_style.css'
import Icons from '../Icons/Icons'
import { makeStyles } from '@material-ui/core/styles';
import { addNotes, getEmailMatch } from '../service/DataService'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

// function TakeNoteTwo(props) {
//     const handleClickAwayEvent = () => {
//         props.listenToTakeNoteOne('tushar')
//     }
//     return (
//         <ClickAwayListener onClickAway={handleClickAwayEvent}>
//             <div className="takeNoteTwoContainer">
//                 take note 2
//             </div>
//         </ClickAwayListener>
//     )
// }

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
    // let allCollaberators = []
    // const [open, setOpen] = useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();


    const handleClickAwayEvent = () => {
        console.log(allCollaberators)
        console.log(JSON.stringify(allCollaberators))
        if (title != '') {
        // if (title != '' || description != '' || allCollaberators.length >= 1) {
            // let obj = {
            //     title: title,
            //     description: description,
            //     isArchived: isArchived,
            //     color: color,
            // }
            const data = new FormData()
            data.append("title", title)
            data.append("description", description)
            data.append("color", color)
            data.append("isArchived", isArchived)
            // data.append("collaberators", allCollaberators)
            data.append("collaberators", JSON.stringify(allCollaberators))
            data.append("reminder", reminder )

            console.log(data)
            addNotes(data).then(res => console.log(res))
            // console.log(data)
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
        // setIsArchived(data)
        // console.log(data)
        setIsArchived(data)
        console.log(isArchived)
        // console.log(event.target)
        // setIsArchived(!isArchived)
    }

    const getColor = (data) => {
        console.log(data)
        setColor(data)
    }

    const getReminder = (data) => {
        // console.log("reminder")
        // console.log(data)
        setReminder(data)
        // console.log(reminder)
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
            // handleChangeCollabInput()
            setAnchorEl(event.target)
            // console.log("matchedInfo : ", matchedInfo)
            // console.log("setMatchingUsers : ", matchingUsers)
        })

    }

    // const handleChangeCollabInput = () => {
    //     console.log("popper will come")
    // }

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
        // allCollaberators.push(event.target.innerText)
        // setallCollaberators(...allCollaberators, event.target.innerText)
        console.log(allCollaberators)
        // setInput('')
        // setopenCollab(false)
        setAnchorEl(null)
    }

    const handleClickCloseCollab = () => {
        setopenCollab(false)
        // allCollaberators.splice(0, allCollaberators.length)
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
                                    {/* <div className="singleCollaborator">
                                        <div className="collaboratorImg">Person1</div>
                                        <div className="collaboratorEmail">someone@gmail.com</div>
                                    </div> */}
                                    
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
                                    <Icons name="TakeNoteTwo" type="removeDeleteIconFromNoteTwoIcons" listenToCollaborator={listenToCollaborator} actionType="CreateNote" getReminder={getReminder} getColor={getColor} archive={archive} close={handleClickAwayEvent} />
                                </div>
                            </div>
                        </div>
                }

        </ClickAwayListener>
    )
}

export default TakeNoteTwo

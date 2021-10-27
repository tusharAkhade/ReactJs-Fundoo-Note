import axios from "axios"

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("fundooToken"),
    },
};

let configObjForaddNotes = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("fundooToken"),
    },
}

export const addNotes = async (obj) => {
    let response = await axios.post( 'http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes', obj, configObjForaddNotes )
    return response
}

export const getNotes = async () => {
    let response = await axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', config)
    let dataArray = response.data.data.data
    return dataArray;
}

export const updateNotes = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes', obj, config)
}


export const addArchiveNotes = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes', obj, config)
    return response
}

export const restoreDeletedNotes = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes', obj, config)
    return response
}

export const updateNoteColor = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes', obj, config)
    return response
}

export const getEmailMatch = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList', obj, config)
    return response.data.data.details
}

export const deleteForever = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes', obj, config)
    return response
}


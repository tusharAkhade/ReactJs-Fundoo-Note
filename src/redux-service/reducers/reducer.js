const initialState = {clicked:"Keep"}
export default function navReducer(state=initialState, action) {
    switch(action.type) {
        case "CLICK_ON_KEEP":
            return {clicked : "Note"}
        case "CLICK_ON_ARCHIVE":
            return {clicked : "Archive"}
        case "CLICK_ON_BIN":
            return {clicked : "Bin"}
        default :
            return state
    }
}

export function updateNoteReducer(state=false, action) {
    switch(action.type) {
        case "UPDATE_NOTE":
            return !state
        default:
            return state
    }
}
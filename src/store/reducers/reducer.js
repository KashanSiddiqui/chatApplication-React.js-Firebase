const INITIAL_STATE = {
    userName: '',
    allUsers: [],
    allMsgs:[],
    userID: '',
    senderID:'',
    isLogin : false,
    progressBarDisplay : false,
    errorMessage : ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_NAME':
        return({
            ...state,
            userName : action.payload
        })
        case 'CURRENT_USER_UID':
            return ({
                ...state,
                userID: action.payload
            })
            case 'IS_LOGIN':
            return ({
                ...state,
                isLogin : action.payload
            })
            case 'SHOW_PROGRESS_BAR':
            return ({
                ...state,
                progressBarDisplay : action.payload
            })
            case 'ERROR_MESSAGE':
            return({
                ...state,
                errorMessage : action.payload
            })
            case 'ALL_USERS':
            { console.log(action.payload) }
            return ({
            ...state,
                allUsers: action.payload
            })
            case "SENDER_ID":
            
            return({
                ...state,
                senderID: action.payload
            })
            
            case "MSG_SEND":
            return({
                ...state
            })
            case 'ALL_MSGS':
            { console.log(action.payload)}
            return ({
            ...state,
                allMsgs: action.payload
            })
            
        default:
            return state;
    }

}
import firebase from 'firebase';
import history from '../../history';


export function signinAction(user) {
    return dispatch => {
        dispatch({ type: "ERROR_MESSAGE", payload: '' })
        dispatch({ type: "SHOW_PROGRESS_BAR", payload: true })
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/' + signedinUser.uid).once('value', (snapshot) => {
                    dispatch({ type: 'USER_NAME', payload: snapshot.val().firstName })
                })
                dispatch({ type: "CURRENT_USER_UID", payload: signedinUser.uid })
                dispatch({ type: "IS_LOGIN", payload: true })
                history.push('/home');
            })
            .catch((err) => {
                dispatch({ type: "SHOW_PROGRESS_BAR", payload: false })
                dispatch({ type: "ERROR_MESSAGE", payload: err.message })
            })
    }
}

export function signupAction(user) {
    return dispatch => {
        dispatch({ type: "ERROR_MESSAGE", payload: '' })
        dispatch({ type: "SHOW_PROGRESS_BAR", payload: true })
        dispatch({ type: 'USER_NAME', payload: user.firstName })
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        dispatch({ type: 'CURRENT_USER_UID', payload: createdUser.uid })
                        dispatch({ type: "IS_LOGIN", payload: true })
                        history.push('/home');
                    })
            })
            .catch((err) => {
                dispatch({ type: "SHOW_PROGRESS_BAR", payload: false })
                dispatch({ type: "ERROR_MESSAGE", payload: err.message })
                console.log(err)
            })
    }
}

// logout fn
export function logout() {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            dispatch({ type: "SHOW_PROGRESS_BAR", payload: false })
            dispatch({ type: "IS_LOGIN", payload: false })
            // Sign-out successful.
            history.push('/signin');
        }, function (error) {
            // An error happened.
        });
    }

}



export function errorMessage(msg) {
    return dispatch => {
        dispatch({ type: 'ERROR_MESSAGE', payload: msg })
    }
}

export function fetchAllUsers() {
    return dispatch => {
        firebase.database().ref('users').once('value', (snapshot) => {
            console.log(snapshot.val())
            let allUsers = [];
            for (var key in snapshot.val()) {
                allUsers.push(snapshot.val()[key]);
            }
            console.log(allUsers)
            dispatch({ type: 'ALL_USERS', payload: allUsers })
        })
    }
}
export function setSenderID(senderID) {
    return dispatch => {
        dispatch({ type: 'SENDER_ID', payload: senderID })
        console.log("sender id in action:", senderID)
    }
}

export function setMsgToDB(senderID, userID, msg, userName) {
    return dispatch => {
        let temp = {
            userName: userName,
            msg: msg
        }
        firebase.database().ref('messages/' + userID + senderID + '/').push(temp)
            .then(() => {
                dispatch({ type: "MSG_SEND", payload: true })
            })
        firebase.database().ref('messages/' + senderID + userID + '/').push(temp)
            .then(() => {
                dispatch({ type: "MSG_SEND", payload: true })
            })
        console.log("in action msg:", msg);
        console.log("in action senderID:", senderID);
        console.log("in action userID:", userID);

    }

}

export function fetchMessages(userID,senderID) {
    let allMsgs = [];
    return dispatch => {

        firebase.database().ref('messages/' + userID + senderID).on('child_added', (snapshot) => {
            console.log(snapshot.val())
            
            //for (var key in snapshot.val()) {
                allMsgs.push(snapshot.val());
            //}
            
        })
        console.log(allMsgs)
            dispatch({ type: 'ALL_MSGS', payload: allMsgs })
    }
}
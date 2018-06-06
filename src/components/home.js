import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { Row, Col, textarea, label, input, Button } from 'react-materialize'
// import { Row, Col } from 'reactstrap';
// import {Avatar} from 'react-materialize'
// import {Avatar} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import FileFolder from 'material-ui/svg-icons/file/folder';
// import FontIcon from 'material-ui/FontIcon';
import { fetchAllUsers, setSenderID, setMsgToDB,fetchMessages } from '../store/actions/action';
// import {
//     Link
//   } from 'react-router-dom';
import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
} from 'material-ui/styles/colors';

const style = { margin: 5 };

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        }
        this.onChangeMsg = this.onChangeMsg.bind(this);
        this._onSendButton = this._onSendButton.bind(this);
    }

    onChangeMsg(event) {
        this.setState({
            msg: event.target.value
        })
        console.log(event.target.value);
        // console.log(this.props.senderId);
        // console.log(this.props.userId);
    }

    _onSendButton() {
        if (this.props.senderId == '') {
            alert("No Chat selected please select Chat First");
        }
        else {
            console.log("msg:", this.state.msg);
            console.log("senderID:", this.props.senderId);
            console.log("userID:", this.props.userId);
            this.props.setMsgToDB(this.props.senderId, this.props.userId, this.state.msg, this.props.userName);
            this.props.fetchMessages(this.props.userId,this.props.senderId);
            // this.state.msg=''
        }
    }


    selectedUser(user) {
        console.log("sender:", user);
        console.log("senderId:", user.uid);
        
        this.props.setSenderId(user.uid);
        this.props.fetchMessages(this.props.userId,user.uid)
        

    }

    componentWillMount() {
        this.props.fetchAllUsers();
    }

    render() {
        return (
            <div>
                <br />
                <MuiThemeProvider>
                    <Row>
                        <Col s={3}>

                            <Scrollbars style={{ width: 350, height: 630, border: "1px solid" }}>

                                <List>
                                    {
                                        this.props.allUsers.map((user, ind) => {
                                            return (
                                                <ListItem key={ind}
                                                    onClick={this.selectedUser.bind(this, user)}
                                                    leftAvatar={<Avatar>{user.firstName.charAt(0).toUpperCase()}</Avatar>}
                                                >
                                                    {user.firstName + " " + user.lastName}
                                                </ListItem >)
                                        })
                                    }

                                </List>
                            </Scrollbars>
                        </Col>

                        <Col s={9} style={{ border: "1px solid", }}>
                            <div style={{ height: 530, border: "1px solid" }}>
                            {
                                this.props.allMsgs.map((msg, ind) => {
                                    return (
                                        <span key={ind}>
                                        {msg.msg}
                                        <br/>
                                        </span>
                                        
                                    )
                                })
                            }
                                
                            </div>
                            <div>
                                <Row style={{ border: "1px solid" }}>
                                    <Col s={10} >
                                        <input id="last_name" type="text" class="validate" label="Type Message here..." onChange={this.onChangeMsg} />
                                    </Col>
                                    <Col s={2}>
                                        <a class="waves-effect waves-light btn" onClick={this._onSendButton}>button</a>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                    </Row>
                </MuiThemeProvider>
            </div>
        )
    }
}

function mapStateToProp(state) {
    console.log(state)
    return ({
        isLogin: state.root.isLogin,
        allUsers: state.root.allUsers,
        senderId: state.root.senderID,
        userId: state.root.userID,
        userName: state.root.userName,
        allMsgs:state.root.allMsgs
    })
}


function mapDispatchToProp(dispatch) {
    return ({
        fetchAllUsers: () => {
            dispatch(fetchAllUsers())
        },
        setSenderId: (senderID) => {
            dispatch(setSenderID(senderID))
        },
        setMsgToDB: (senderID, userID, msg, userName) => {
            dispatch(setMsgToDB(senderID, userID, msg, userName))
        },
        fetchMessages:(userId,senderId)=>{
            dispatch(fetchMessages(userId,senderId))
        }
        // logoutUser: () => {
        //     dispatch(logout())
        // }
    })
}

export default
    connect(mapStateToProp, mapDispatchToProp)(Home);

    // {
    //     this.props.allUserData.map((user, ind) => {
    //         return ()
    //     })
    // }
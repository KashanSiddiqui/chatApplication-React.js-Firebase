import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinAction, errorMessage } from '../store/actions/action';
import { Col, ProgressBar, Row, Input, Button } from 'react-materialize';
import {
    Link
} from 'react-router-dom';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.signin = this.signin.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
    }

    signin(event) {//Method that dispatch an action
        event.preventDefault();
        if((this.state.email === '' || this.state.password === ''))
        {
            this.props.errorMessage('Both the fields are required!');
        }
        else{
            let user = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.signinWithEmailPassword(user);
        }
    }

    _onChangeEmail(event) {// Onchange Event Handlers
        this.setState({
            email: event.target.value
        })
    }
    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    componentWillMount(){
        this.props.errorMessage('');
    }
    render() {
        return (
            <Row >
                <Col s={3}></Col>
                <Col s={6} style = {{height : '400px', border: '1px solid gray', borderTop : 'none'}}>
                    <h1>Signin</h1>
                    <form onSubmit={this.signin.bind(this)}>
                        <Input s= {12} type="email" name='email' value={this.state.email} title = 'type password here' onChange={this._onChangeEmail} label="Type Email Here" validate></Input>
                        <br />
                        <Input s= {12} type='password' name='password' value={this.state.password} title = 'type email here' onChange={this._onChangePassword} label='Type Password Here' validate/>
                        <Button className="btn waves-effect waves-light" type="submit" name="action" title = 'signin' style = {{display : 'block'}}>Signin</Button>
                        <Link to='/'>Be awesome, join our community!</Link>
                    <div><p style = {{color : "red"}}>{this.props.errorMsg}</p></div>
                    </form>
                    {
                        (this.props.progressBarDisplay) ? (
                            <Col s={12}>
                                <ProgressBar />
                            </Col>
                        ) :
                            null
                    }
                </Col>
                <Col s={3}></Col>
            </Row>
        )
    }
}

function mapStateToProp(state) {
    return ({
        progressBarDisplay: state.root.progressBarDisplay,
        errorMsg : state.root.errorMessage
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        signinWithEmailPassword: (user) => {
            dispatch(signinAction(user))
        },
        errorMessage: (message)=>{
            dispatch(errorMessage(message));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);
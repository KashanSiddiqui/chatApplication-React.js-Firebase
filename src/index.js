import React from 'react';
import ReactDOM from 'react-dom';
import BasicRouting from './config/routes';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAY8KlxXoDqwyFa1PB30bwGu0iNTB8SagM",
  authDomain: "chat-application-c70bb.firebaseapp.com",
  databaseURL: "https://chat-application-c70bb.firebaseio.com",
  projectId: "chat-application-c70bb",
  storageBucket: "",
  messagingSenderId: "600970843293"
};
firebase.initializeApp(config);

ReactDOM.render( <Provider store={store}>
    <BasicRouting />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
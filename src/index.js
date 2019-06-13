import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase'
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
const firebaseConfig = {
    apiKey: "AIzaSyCyISoxWqGCkJabC3wfG1JSGiGCA-kRPpk",
    authDomain: "itdamusementpark.firebaseapp.com",
    databaseURL: "https://itdamusementpark.firebaseio.com",
    projectId: "itdamusementpark",
    storageBucket: "itdamusementpark.appspot.com",
    messagingSenderId: "765574190072",
    appId: "1:765574190072:web:5b0d9d84befef181"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>

)
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

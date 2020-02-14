import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//for dev only!
import axios from "axios";
window.axios = axios;

ReactDOM.render(<App />, document.getElementById('root'));


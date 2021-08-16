import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App/App.jsx';

const root = document.querySelector('#root');
if(root.hasChildNodes())    
    hydrate(
        <Router>
            <App />
        </Router>
        , root
    )
else 
    render(
        <Router>
            <App />
        </Router>
        , root
    )
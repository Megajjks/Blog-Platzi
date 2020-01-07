import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from '../src/reducers' //Mis reducers creados
import '../src/css/index.css';
import '../src/css/iconos.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

//Creamos el store
const store = createStore(
    reducers,//Todos los reducers
    {}, //El estado inicial
    applyMiddleware(reduxThunk) //añadimos el middleware en este caso el redux thunk
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

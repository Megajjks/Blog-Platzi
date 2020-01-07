import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './menu'
import Usuarios from './Usuarios/index'
import Publicaciones from './Publicaciones/index'

const Tareas = () => <div>Tareas</div>

const App = (props) =>(
  <BrowserRouter>
    <Menu/>
    <Switch>
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />  
      <Route exact path='/publicaciones/:key' component={Publicaciones} />    
    </Switch>
  </BrowserRouter>
)

export default App;
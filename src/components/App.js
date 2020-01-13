import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './menu'
import Usuarios from './Usuarios/index'
import Publicaciones from './Publicaciones/index'
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar';

const App = (props) =>(
  <BrowserRouter>
    <Menu/>
    <Switch>
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />  
      <Route exact path='/publicaciones/:key' component={Publicaciones} />
      <Route exact path='/tareas/guardar' component={TareasGuardar} />
      <Route exact path='/tareas/editar/:usu_id/:tar_id' component={TareasGuardar} />
    </Switch>
  </BrowserRouter>
)

export default App;
//Archivo para combinar los reducers que yo crée
import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './publicacionesReducer';
import tareasReducer from './tareasReducer';

//Aquí iran los reducers que se convinarana para enviar a mi store
export default combineReducers({
	usuariosReducer,
	publicacionesReducer,
	tareasReducer
});
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as tareasAction from '../../actions/tareasAction';

class Tareas extends Component {
    
    componentDidMount(){
        this.props.traerTodas()
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                Tareas saludar
            </div>
        )
    }
}

const mapStateToProps = ({ tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasAction)(Tareas);
import React, { Component } from 'react';
import './App.css';
import Reset from './components/reset';
import Result from './components/result';
import Color from './components/color';
import Size from './components/size';
class App extends Component{
    constructor (props) {
        super(props);
        this.state = {
            color : 'red',
            size  : 10
        }
    }

    onSetColor = (color)=>{
        this.setState({
            color : color
        })
    }
    render () {
        return (
            <div className="container mt-50">
                <div className="row">
                    <Color color={this.state.color}
                     onReceiveColor={this.onSetColor}/>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Size />
                        <Reset />
                    </div>
                    <Result color={this.state.color} />
                </div>
            </div>
        );
    }
}

export default App1;

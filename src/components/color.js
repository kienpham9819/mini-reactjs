import React, { Component } from 'react';

class Color extends Component {
    constructor (props){
        super(props);
        this.state = {
            colors : ['red', 'green', 'blue']
        }
    }
    showColor = (color) => {
        return  {
            backgroundColor : color,
            padding : 10 + 'px',
            marginLeft : 10 + 'px'
        };

    }

    setActiveColor(color) {
        this.props.onReceiveColor(color);
    }
    render () {

        const c = this.state.colors.map((color, index) => {
            return <span key={index}
                        style={ this.showColor(color) }
                        className={this.props.color===color ? 'active' : ''}
                        onClick={() => {this.setActiveColor(color)}}
                        >{color}</span>
        });
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Pick color
                        </h3>
                    </div>
                    <div className="panel-body">
                        {c}
                        <br />
                    </div>
                </div>
            </div>);
    }
}

export default Color;

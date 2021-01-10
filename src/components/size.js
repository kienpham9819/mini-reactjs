import React, { Component } from 'react';

class Size extends Component {
    render () {
        return (
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3 class="panel-title">Size : </h3>
                </div>
                <div class="panel-body">
                    <button className="btn btn-success">Tang</button>
                    <button className="btn btn-danger">Giam</button>
                </div>
            </div>);
    }
}

export default Size;

import React, { Component } from 'react';

class Product extends Component {
    handleClick = ()=> {
        alert(123);
    }

    handleClick1(number){
        alert(number);
    }

    render() {
        const list = [
            {name : 'v'},
            {name : 'c'},
            {name : 'd'}
        ];
        let v = "10";

        let el = list.map((item, index) => {
            return  (<div key={index}>
                        {item.name}
                    </div>);
        });
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <a href="https://reactjs.org/docs/create-a-new-react-app.html" className="thumbnail">
                    <img src="https://zshop.vn/images/link/63/1045.jpg?t=1474958283" alt="iphone 6" />
                    {el}
                </a>
                <button className="btn btn-danger" onClick={() => {this.handleClick1(v)}}>click me</button>
            </div>
        );
    }
}

export default Product;

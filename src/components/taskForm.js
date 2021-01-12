import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    // componentWillMount() {
    //     if (this.props.task) {
    //         this.setState({
    //             id : this.props.task.id,
    //             name : this.props.task.name,
    //             status : this.props.task.status
    //         });
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEdit) {
            this.setState({
                id: nextProps.itemEdit.id,
                name : nextProps.itemEdit.name,
                status : nextProps.itemEdit.status
            });
        } else if(nextProps && nextProps.itemEdit===null) {
            this.setState({
                id: '',
                name : '',
                status : false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        let result = (name==="status" ? (value==="true" ? true : false) : value);
        this.setState({
            [name] : result
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }
    render() {
        let {id} = this.state;
        let { isDisplayForm } = this.props;
        if (!isDisplayForm) {
            return null;
        }
        return (
             <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id=="" ? "Thêm Công Việc" : "Cập nhật công Việc"}
                        <span
                            className="fa fa-times-circle text-right ml-150"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.onChange}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEdit : state.itemEdit
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

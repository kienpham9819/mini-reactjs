import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onOpenForm();
        this.props.onUpdate(this.props.task);
    }

    render() {
        let {task} = this.props;
        let {index} = this.props;
        return (
            <tr>
                <td>{index}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className="label label-success" onClick={this.onUpdateStatus}>
                        {task.status ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
        }
}

const mapStateToProps = state => {
    return {
        tasks : state.tasks
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDelete : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onUpdate : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
